import { appFactory } from '~/helpers/factory'

export const apiRouteApp = appFactory.createApp()
  .get('', async c => c.text('OK'))
