import { handle } from 'hono-adapter-aws-lambda'
import { env, isDevelopment } from 'std-env'
import { app } from './app'

export const handler = handle(app)

if (isDevelopment) {
  // Setup openapi spec and ui
  const { setupOpenApi } = await import('./openApi')
  setupOpenApi(app)

  // Serve local server
  const { serve } = await import('srvx')

  const server = serve({
    fetch(request) {
      return app.fetch(request)
    },
    port: +env.APP_DEV_port!,
  })

  server.ready().then(() => {
    // eslint-disable-next-line no-console
    console.info(`🚀 Server ready at ${server.url}`)
  })
}
