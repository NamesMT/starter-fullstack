/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'starter-fullstack',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    const backend = new sst.aws.Function('Backend', {
      url: true,
      handler: 'apps/backend/src/index.handler',
    })

    return {
      backend: backend.url,
    }
  },
})
