import { createProxyEventHandler } from 'h3-proxy'

let currentUrl = useRuntimeConfig().public.backendUrl
let currentHandler = createProxyEventHandler({
  target: currentUrl,
  pathFilter: ['/api/**'],
  changeOrigin: true,
  configureProxyRequest: () => ({ streamRequest: true, sendStream: true, fetchOptions: { redirect: 'manual' } }),
})
export default defineEventHandler((e) => {
  const backendUrl = useRuntimeConfig().public.backendUrl
  if (currentUrl !== backendUrl) {
    recreateHandler()
    currentUrl = backendUrl
  }

  return currentHandler(e)
})

function recreateHandler() {
  currentHandler = createProxyEventHandler({
    target: currentUrl,
    pathFilter: ['/api/**'],
    changeOrigin: true,
    configureProxyRequest: () => ({ streamRequest: true, sendStream: true, fetchOptions: { redirect: 'manual' } }),
  })
}