import { hc } from 'hono/client'
import type { AppType } from 'backend/rpc'

export default defineNuxtPlugin(async () => {
  const url = useRequestURL()
  // In SSR (Node) we don't have a base path for the url and fetch (undici) will fails.
  // This automatically get the current host to fix it that.
  const apiClient = hc<AppType>(`https://${url.host}/`)

  return {
    name: 'local-rpcApi',
    provide: {
      apiClient,
    },
  }
})
