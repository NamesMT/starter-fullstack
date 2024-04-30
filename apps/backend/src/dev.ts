import { env, isDevelopment } from 'std-env'
import { localcert, localcertKey } from '@local/common/node'
import type { Hono } from 'hono'
import { logger } from './logger'

export async function tryServeApp(app: Hono<any>) {
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
}
