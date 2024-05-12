import { hc } from 'hono/client'
import type { app } from 'backend'

export default defineNuxtPlugin(async () => {
  const url = useRequestURL()
  // If the frontend and backend domain are on the same domain, we will call the proxy instead of the backendUrl directly
  const backendUrl = useRuntimeConfig().public.backendUrl
  const urlBackend = new URL(backendUrl)
  const apiClient = hc<typeof app>(
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
