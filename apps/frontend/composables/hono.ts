import type { Awaitable } from '@vueuse/core'
import type { ClientResponse } from 'hono/client'

type GetInnerType<S> = S extends ClientResponse<infer T> ? T : never
export async function hcRes<T extends ClientResponse<any>>(fetchRes: Awaitable<T>): Promise<GetInnerType<T> extends Record<string, never> ? unknown : GetInnerType<T>> {
  const res = await fetchRes

  // @ts-expect-error res incompatible, parseResponse unknown
  return parseResponse(res)
}
