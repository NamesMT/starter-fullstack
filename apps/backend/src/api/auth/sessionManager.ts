// This is a simple single-user in-memory manager for local development demo only, you would need to expand by any method you like to support multi-user production workload.
// Reference: https://kinde.com/docs/developer-tools/typescript-sdk/#log-in-and-register

import type { SessionManager } from '@kinde-oss/kinde-typescript-sdk'

let store: Record<string, unknown> = {}

export const sessionManager: SessionManager = {
  async getSessionItem(key: string) {
    return store[key]
  },
  async setSessionItem(key: string, value: unknown) {
    store[key] = value
  },
  async removeSessionItem(key: string) {
    delete store[key]
  },
  async destroySession() {
    store = {}
  },
}
