import { hc } from 'hono/client'
import type { app } from 'backend'

export default defineNuxtPlugin({
  name: 'local-rpcApi',
  parallel: true,
  async setup() {
    const url = useRequestURL()
    // If the frontend and backend domain are on the same domain, we will call the proxy instead of the backendUrl directly
    const backendUrl = useRuntimeConfig().public.backendUrl
    const urlBackend = new URL(backendUrl)
    const enableProxy = useAppConfig().enableProxy
    const callProxy = enableProxy === 'auto'
      ? urlBackend.hostname === url.hostname
      : enableProxy
    const apiClient = hc<typeof app>(callProxy
      ? `https://${url.host}`
      : backendUrl,
    )

    return {
      provide: {
        apiClient,
      },
    }
  },
})
