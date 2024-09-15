import { appFactory } from '~/factory'
import { authApp } from './auth/app'
import { greetRouteApp } from './greet'
import { helloRouteApp } from './hello'

export const apiApp = appFactory.createApp()
  // Auth app - you'll need to setup Kinde environment variables.
  .route('/auth', authApp)

  // Simple health check route
  .route('/hello', helloRouteApp)

  // Simple greet route for arktype input validation demo
  .route('/greet', greetRouteApp)

// ### This block contains the sample code for streaming APIs,
// import type { TypedResponse } from 'hono'
// import { streamText } from 'hono/streaming'

// Do note that SST doesn't support Live Development for Lambda streaming API yet: https://github.com/sst/ion/issues/63

// For RPC to know the type of streamed endpoints you could manually cast it with TypedResponse 👌
// .get('/helloStream', c => streamText(c, async (stream) => {
//   await stream.writeln('Hello from Hono `/api/helloStream`!')
// }) as Response & TypedResponse<'Hello from Hono `/api/helloStream`!'>)
