import { destr } from 'destr'

// // // Copied from ofetch
export interface ResponseMap {
  blob: Blob
  text: string
  arrayBuffer: ArrayBuffer
  stream: ReadableStream<Uint8Array>
}

export type ResponseType = keyof ResponseMap | 'json'

const nullBodyResponses = new Set([101, 204, 205, 304])
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i
const textTypes = new Set([
  'image/svg',
  'application/xml',
  'application/xhtml',
  'application/html',
])
export function detectResponseType(_contentType = ''): ResponseType {
  if (!_contentType)
    return 'json'

  // Value might look like: `application/json; charset=utf-8`
  const contentType = _contentType.split(';').shift() || ''

  if (JSON_RE.test(contentType))
    return 'json'

  // TODO
  // if (contentType === 'application/octet-stream') {
  //   return 'stream'
  // }

  if (textTypes.has(contentType) || contentType.startsWith('text/'))
    return 'text'

  return 'blob'
}

export async function parseResponse(res: Response) {
  const hasBody = res.body && !nullBodyResponses.has(res.status)

  if (hasBody) {
    const responseType = detectResponseType(res.headers.get('content-type') || '')

    // We override the `.json()` method to parse the body more securely with `destr`
    switch (responseType) {
      case 'json': {
        const data = await res.text()
        return destr(data)
      }
      case 'stream': {
        return res.body
      }
      default: {
        return await res[responseType]()
      }
    }
  }
}
// // //
