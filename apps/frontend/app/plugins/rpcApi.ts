import { type ClientRequestOptions, hc } from 'hono/client'
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

    const clientRequestOptions = { init: { credentials: 'include' }, headers: {} as Record<string, any> } satisfies ClientRequestOptions

    const apiClient = hc<typeof app>(
      callProxy
        ? `https://${url.host}`
        : backendUrl,
      clientRequestOptions,
    )

    // Uncomment to include an Authorization header with the session token
    // await _withHeaderSession()

    async function _withHeaderSession() {
      const { sign } = await import('hono/jwt')
      const token = useCookie('headerSessionToken', {
        sameSite: 'strict',
        secure: true,
      })

      if (!token.value)
        token.value = await sign({ id: Math.random() + Date.now() }, 'top-secret')

      clientRequestOptions.headers.Authorization = `Bearer ${token.value}`
    }

    return {
      provide: {
        apiClient,
      },
    }
  },
})
