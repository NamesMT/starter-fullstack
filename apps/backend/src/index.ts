import { handle } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'
import { CookieStore, sessionMiddleware } from 'hono-sessions'
import { cors } from 'hono/cors'
import { isDevelopment } from 'std-env'

import type { HonoEnv } from './types'
import { apiApp } from './api/app'
import { devAdapter, tryServeApp } from './dev'

const _app = new Hono<HonoEnv>()
// Registers an adapter middleware for development only
if (isDevelopment)
  _app.use(devAdapter)

export const app = _app
  // CORS middleware
  .use(cors())

  // Session management middleware
  .use(sessionMiddleware({
    store: new CookieStore(),
    encryptionKey: 'password_at_least_32_characters!', // Required for CookieStore, recommended for others
    expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
    cookieOptions: {
      sameSite: 'Lax', // Recommended for basic CSRF protection in modern browsers
      path: '/', // Required for this library to work properly
      httpOnly: true, // Recommended to avoid XSS attacks
    },
  }))

  .notFound(c => c.text('four-o-four'))
  .route('/api', apiApp)

export const handler = handle(app)
export * from './logger'

// Serve API server if in development
tryServeApp(app)
