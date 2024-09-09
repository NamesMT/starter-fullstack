import { appFactory } from '~/factory'

import { getHelloMessage } from './hello.helper'

export const helloRouteApp = appFactory.createApp()
  .get('', async c => c.text(getHelloMessage()))
