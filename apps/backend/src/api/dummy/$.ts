import { appFactory } from '~/helpers/factory'
import { dummyGreetRouteApp } from './greet'
import { dummyHelloRouteApp } from './hello'

export const dummyApp = appFactory.createApp()
  .route('/hello', dummyHelloRouteApp)

  .route('/greet', dummyGreetRouteApp)
