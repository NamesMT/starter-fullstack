import { hc } from 'hono/client'
import type { AppType } from 'backend/rpc'

export default defineNuxtPlugin(async () => {
  const url = useRequestURL()
  // If the frontend and backend domain are on the same domain, we will call the proxy instead of the backendUrl directly
  const backendUrl = useRuntimeConfig().public.backendUrl
  const urlBackend = new URL(backendUrl)
  const apiClient = hc<AppType>(
    urlBackend.hostname === url.hostname
      ? `https://${url.host}`
      : backendUrl,
  )

  return {
    name: 'local-rpcApi',
    provide: {
      apiClient,
    },
  }
})
