import { handle } from 'hono-adapter-aws-lambda'
import { env, isDevelopment } from 'std-env'
import { app } from './app'

export const handler = handle(app)

if (isDevelopment) {
  // Setup openapi spec and ui
  const { setupOpenAPI } = await import('./openAPI')
  setupOpenAPI(app)

  // Serve local server
  const { serve } = await import('srvx')

  const server = serve({
    fetch(request) {
      return app.fetch(request)
    },
    hostname: env.APP_DEV_host,
    port: +(env.APP_DEV_port ?? '3301'),
  })

  server.ready().then(() => {
    // eslint-disable-next-line no-console
    console.info(`🚀 Server ready at ${server.url}`)
  })
}
