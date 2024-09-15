import { cors } from 'hono/cors'
import { logger as loggerMiddleware } from 'hono/logger'
import { handle } from 'hono-adapter-aws-lambda'
import { env, isDevelopment } from 'std-env'
import { devAdapter, tryServeApp } from '~/dev'
import { appFactory, triggerFactory } from '~/factory'
import { errorHandler } from '~/helpers/error'
import { cookieSession } from '~/middlewares/session'
import { apiApp } from './api/app'

const _app = appFactory.createApp()
// Registers an adapter middleware for development only
if (isDevelopment)
  _app.use(devAdapter)

export const app = _app
  // Register global not found handler
  .notFound(c => c.text('four-o-four', 404))

  // Register global error handler
  .onError(errorHandler)

  // Request logging middleware
  .use(loggerMiddleware())

  // Register trigger routes, after the logging middleware but before the request-based middlewares
  .route('/', triggerFactory.honoApp)

  // CORS middleware
  .use(cors({
    origin: [env.FRONTEND_URL!],
    credentials: true,
  }))

  // Session management middleware, configure and see all available managers in `src/middlewares/session.ts`
  .use(await cookieSession())

  // Register API routes
  .route('/api', apiApp)

export const handler = handle(app)

// Serve API server if in development
tryServeApp(app)
