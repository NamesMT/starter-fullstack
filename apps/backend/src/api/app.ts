// import type { TypedResponse } from 'hono'
// import { streamText } from 'hono/streaming'

import { authApp } from './auth/app'

import { appFactory } from '~/factory'

const app = appFactory.createApp()
  // $Auth - you'll need to setup Kinde environment variables.
  .route('/auth', authApp)

// Disabling the streaming API because https://github.com/sst/ion/issues/63
// For RPC to know the type of streamed endpoints you could manually cast it with TypedResponse 👌
// .get('/helloStream', c => streamText(c, async (stream) => {
//   await stream.writeln('Hello from Hono `/api/helloStream`!')
// }) as Response & TypedResponse<'Hello from Hono `/api/helloStream`!'>)

  // Simple health check route
  .get('/hello', c => c.text(`Hello from Hono \`/api/hello\`! - ${Date.now()}`))

export {
  app as apiApp,
}
