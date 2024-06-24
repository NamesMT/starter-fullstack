import { handle } from '@namesmt/hono-adapter-aws-lambda'
import { cors } from 'hono/cors'
import { logger as loggerMiddleware } from 'hono/logger'
import { env, isDevelopment } from 'std-env'

import { apiApp } from './api/app'
import { cookieSession } from '~/middlewares/session'
import { devAdapter, tryServeApp } from '~/dev'
import { appFactory } from '~/factory'

const _app = appFactory.createApp()
// Registers an adapter middleware for development only
if (isDevelopment)
  _app.use(devAdapter)

export const app = _app
  // Request logging middleware
  .use(loggerMiddleware())

  // CORS middleware
  .use(cors({
    origin: [env.FRONTEND_URL!],
    credentials: true,
  }))

  // Session management middleware, configure and see all available managers in `src/middlewares/session.ts`
  .use(await cookieSession())

  // Register not found handler
  .notFound(c => c.text('four-o-four'))

  // Register API routes
  .route('/api', apiApp)

export const handler = handle(app)

// Serve API server if in development
tryServeApp(app)
