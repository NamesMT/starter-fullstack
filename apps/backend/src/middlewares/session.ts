import { CookieStore, sessionMiddleware } from 'hono-sessions'

export function cookieSession() {
  return sessionMiddleware({
    store: new CookieStore(),
    encryptionKey: 'password_at_least_32_characters!', // Required for CookieStore, recommended for others
    expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
    cookieOptions: {
      sameSite: 'None', // Setting to None to support usecase of different domains for backend and frontend
      secure: true, // Enforce HTTPS for cookie, required for sameSite: 'None'
      path: '/', // Required for this library to work properly
      httpOnly: true, // Recommended to avoid XSS attacks
    },
  })
}
