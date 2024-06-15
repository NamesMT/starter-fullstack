import { handle } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger as loggerMiddleware } from 'hono/logger'
import { env, isDevelopment } from 'std-env'

import type { HonoEnv } from './types'
import { devAdapter, tryServeApp } from './dev'
import { cookieSession } from './middlewares/session'
import { apiApp } from './api/app'

const _app = new Hono<HonoEnv>()
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
export * from './logger'

// Serve API server if in development
tryServeApp(app)
