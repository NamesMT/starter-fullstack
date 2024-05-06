import { env, isDevelopment } from 'std-env'
import type { Hono, MiddlewareHandler } from 'hono'
import { logger } from './logger'

// TODO: This middleware populate AWS context in local development
export const devAdapter: MiddlewareHandler = async (_c, next) => {
  await next()
}

export async function tryServeApp(app: Hono<any>) {
  if (isDevelopment) {
    // Configure in .env file
    const hostname = env.APP_DEV_host
    const port = +env.APP_DEV_port!

    logger.info(`NODE_DEV=dev detected, serving API server at: https://${hostname}:${port}`)
    // const { createSecureServer } = await import('node:http2')
    const { readFileSync } = await import('node:fs')
    const { localcertPath, localcertKeyPath } = await import('@local/common/node')
    const { createServer } = await import('node:https')
    const { serve } = await import('@hono/node-server')

    serve({
      fetch: app.fetch,
      createServer,
      serverOptions: {
        cert: readFileSync(localcertPath),
        key: readFileSync(localcertKeyPath),
      },
      hostname,
      port,
    })
  }
}
