import type { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { env, isDevelopment } from 'std-env'
import { logger } from '~/logger'

export async function serveApp(app: Hono<any>) {
  let hostname = env.APP_HOST
  let port = +env.APP_PORT!

  if (isDevelopment) {
    // Configure in .env file
    hostname = env.APP_DEV_host
    port = +env.APP_DEV_port!

    const { readFileSync } = await import('node:fs')
    const { localcertPath, localcertKeyPath } = await import('@local/common/node')
    const { createServer } = await import('node:https')

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
  // In production generally you would use a load balancer or proxy to handle SSL, so we are serving as plain http here.
  else {
    serve({
      fetch: app.fetch,
      hostname,
      port,
    })
  }

  logger.info(`Serving API server at: ${isDevelopment ? 'https' : 'http'}://${hostname}:${port}`)
}
