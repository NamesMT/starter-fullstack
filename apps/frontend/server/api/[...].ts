import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const backendUrl = useRuntimeConfig().public.backendUrl
  const target = joinURL(backendUrl, event.path)

  return proxyRequest(event, target)
})
