import { appFactory } from '~/helpers/factory'
import { getHelloMessage } from './hello.helper'

export const dummyHelloRouteApp = appFactory.createApp()
  .get('', async c => c.text(getHelloMessage()))
