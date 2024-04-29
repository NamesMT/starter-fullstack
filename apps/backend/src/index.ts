import 'dotenv/config'
import { env, isDevelopment } from 'std-env'
import { localcert, localcertKey } from '@local/common/node'

import type { LambdaContext, LambdaEvent } from '@namesmt/hono-adapter-aws-lambda'
import { streamHandle } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'

import { cors } from 'hono/cors'
import { logger } from './logger'

import { apiApp } from './api/app'

type Bindings = {
  event: LambdaEvent
  context: LambdaContext
}

const app = new Hono<{ Bindings: Bindings }>()
app.use(cors())

// Registers an adapter middleware for development only
if (isDevelopment) {
  // TODO: This middleware populate AWS context in local development
  app.use(async (c, next) => {
    await next()
  })
}

app.notFound(c => c.text('four-o-four'))
app.route('/api', apiApp)

// Allow fallback for local development where awslambda global doesn't exists
// @ts-expect-error awslambda does not exists
export const handler = typeof globalThis.awslambda !== 'undefined' ? streamHandle(app) : undefined
export * from './logger'

// Serve API server when in development
if (isDevelopment) {
  // Configure in .env file
  const hostname = env.APP_DEV_host
  const port = +env.APP_DEV_port!

  logger.info(`NODE_DEV=dev detected, serving API server at: https://${hostname}:${port}`)
  // const { createSecureServer } = await import('node:http2')
  const { createServer } = await import('node:https')
  const { serve } = await import('@hono/node-server')

  serve({
    fetch: app.fetch,
    createServer,
    serverOptions: {
      cert: localcert,
      key: localcertKey,
    },
    hostname,
    port,
  })
}
