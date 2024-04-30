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
      timeout: '60 seconds',
      // If you need to process a big amount of data, you should create sub "job" functions instead of rising the the spec of the main function
      memory: '300 MB',
      streaming: false,
    })

    return {
      backendUrl: backend.url,
    }
  },
})
