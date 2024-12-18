import { appFactory } from '~/helpers/factory'
import { authRoutesApp } from './$.routes'

export const authApp = appFactory.createApp()
  .route('', authRoutesApp)
