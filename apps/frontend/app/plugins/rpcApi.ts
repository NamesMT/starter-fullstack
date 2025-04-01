// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore TS6305: `backend/src/app` has not been built yet
import type { app } from 'backend/src/app'
import type { ClientRequestOptions } from 'hono/client'
import { hc } from 'hono/client'
import { sha256 } from 'hono/utils/crypto'

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

    // this wrappedFetch calculates the sha256 hash of the request body and adds it to the headers, it is necessary for AWS Lambda + OAC on POST/PUT requests.
    const wrappedFetch = async (url: string | URL | Request, options?: RequestInit) => {
      if (options?.body) {
        options.headers = new Headers(options.headers || {})
        // TODO: make sure this work well with all forms of BodyInit, i.e: FormData, Blob, etc.
        options.headers.set(
          'x-amz-content-sha256',
          (await sha256(typeof options.body === 'string'
            ? options.body
            : JSON.stringify(options.body)))!,
        )
      }

      return fetch(url, options)
    }

    const clientRequestOptions = {
      init: { credentials: 'include' },
      headers: {} as Record<string, any>,
      fetch: wrappedFetch,
    } satisfies ClientRequestOptions

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
