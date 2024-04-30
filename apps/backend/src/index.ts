import { streamHandle } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'
import { CookieStore, sessionMiddleware } from 'hono-sessions'
import { cors } from 'hono/cors'
import { isDevelopment } from 'std-env'

import type { HonoEnv } from './types'
import { apiApp } from './api/app'
import { tryServeApp } from './dev'

const app = new Hono<HonoEnv>()

// CORS middleware
app.use(cors())

// Session management middleware
// @ts-expect-error library known types error with Hono v4, Reference: https://github.com/jcs224/hono_sessions?tab=readme-ov-file#typescript-errors
app.use(sessionMiddleware({
  store: new CookieStore(),
  encryptionKey: 'password_at_least_32_characters!', // Required for CookieStore, recommended for others
  expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
  cookieOptions: {
    sameSite: 'Lax', // Recommended for basic CSRF protection in modern browsers
    path: '/', // Required for this library to work properly
    httpOnly: true, // Recommended to avoid XSS attacks
  },
}))

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

// Serve API server if in development
tryServeApp(app)
