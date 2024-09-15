import { type } from 'arktype'
import { appFactory } from '~/factory'
import { customArktypeValidator } from '~/middlewares/arktype'

export const greetRouteApp = appFactory.createApp()
  .get(
    '',
    customArktypeValidator('query', type({
      name: 'string>0',
    })),
    async (c) => {
      const { name } = c.req.valid('query')
      return c.text(`Hello ${name}!`)
    },
  )
