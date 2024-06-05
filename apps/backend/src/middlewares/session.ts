import { CookieStore, sessionMiddleware as libSessionMiddleware } from 'hono-sessions'

export function sessionMiddleware() {
  return libSessionMiddleware({
    store: new CookieStore(),
    encryptionKey: 'password_at_least_32_characters!', // Required for CookieStore, recommended for others
    expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
    cookieOptions: {
      sameSite: 'Lax', // Recommended for basic CSRF protection in modern browsers
      path: '/', // Required for this library to work properly
      httpOnly: true, // Recommended to avoid XSS attacks
    },
  })
}
