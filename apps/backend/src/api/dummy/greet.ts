import { type } from 'arktype'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/arktype'
import { customArktypeValidator } from '~/helpers/arktype'
import { appFactory } from '~/helpers/factory'
import { i18nComposer } from '~/helpers/i18n'

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
      'name': 'string>0',
      'locale?': `'en' | 'vi'`,
    })),
    async (c) => {
      const { name, locale } = c.req.valid('query')
      return c.text(`${i18nComposer.t('hello', 1, { locale })} ${name}!`)
    },
  )
