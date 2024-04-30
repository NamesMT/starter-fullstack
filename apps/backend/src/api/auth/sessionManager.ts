import type { SessionManager } from '@kinde-oss/kinde-typescript-sdk'
import type { Context } from 'hono'
import type { Session } from 'hono-sessions'

/**
 * This is a wrapper on top of hono-sessions for Kinde compatibility
 */
export function toKindeSessionManager(session: Session): SessionManager {
  return {
    async getSessionItem(key: string) {
      return session.get(key)
    },
    async setSessionItem(key: string, value: unknown) {
      session.set(key, value)
    },
    async removeSessionItem(key: string) {
      delete session.getCache()._data[key]
    },
    async destroySession() {
      session.deleteSession()
    },
  }
}

/**
 * A simple shortcut for `toKindeSessionManager(c.get('session'))`
 */
export function getSessionManager(c: Context) {
  return toKindeSessionManager(c.get('session'))
}
