import sharedConfig from './shared.config'

export default {
  resolve: {
    alias: sharedConfig.alias,
  },
  ...sharedConfig,
}
