import type { Hono } from 'hono'
import { apiReference } from '@scalar/hono-api-reference'
import { openAPISpecs } from 'hono-openapi'

export function setupOpenAPI(app: Hono<any, any>, prefix = '/openapi') {
  // OpenAPI spec
  app.get(
    `${prefix}/spec`,
    openAPISpecs(app, {
      documentation: {
        info: { title: `starter-fullstack's backend`, version: '1.0.0', description: 'My amazing API' },
      },
    }),
  )

  // OpenAPI UI with Scalar
  app.get(
    `${prefix}/ui`,
    apiReference({
      theme: 'deepSpace',
      spec: { url: `${prefix}/spec` },
    }),
  )
}
