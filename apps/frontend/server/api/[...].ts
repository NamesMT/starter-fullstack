import { createProxyEventHandler } from 'h3-proxy'

let currentUrl = useRuntimeConfig().public.backendUrl
let currentHandler = createProxyEventHandler({
  target: currentUrl,
  changeOrigin: true,
  configureProxyRequest: () => ({ streamRequest: true, sendStream: true, fetchOptions: { redirect: 'manual' } }),
})
export default defineEventHandler(async (e) => {
  const backendUrl = useRuntimeConfig().public.backendUrl
  if (currentUrl !== backendUrl) {
    recreateHandler()
    currentUrl = backendUrl
  }

  return currentHandler(e).catch((err: Error) => {
    console.error('Error when trying to proxy request, is the backend server available?')
    console.error(err)

    setResponseStatus(e, 500, 'Server Error')
  })
})

function recreateHandler() {
  currentHandler = createProxyEventHandler({
    target: currentUrl,
    changeOrigin: true,
    configureProxyRequest: () => ({ streamRequest: true, sendStream: true, fetchOptions: { redirect: 'manual' } }),
  })
}
