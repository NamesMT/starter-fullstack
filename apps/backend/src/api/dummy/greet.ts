import { type } from 'arktype'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/arktype'
import { customArktypeValidator } from '~/helpers/arktype'
import { appFactory } from '~/helpers/factory'

export const dummyGreetRouteApp = appFactory.createApp()
  .get(
    '',
    describeRoute({
      description: 'Say hello to a user',
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'text/plain': { schema: resolver(
              type('string'),
            ) },
          },
        },
      },
    }),
    customArktypeValidator('query', type({
      name: 'string>0',
    })),
    async (c) => {
      const { name } = c.req.valid('query')
      return c.text(`Hello ${name}!`)
    },
  )
