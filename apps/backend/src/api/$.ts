import { appFactory } from '~/helpers/factory'
import { apiRouteApp } from './$$'
import { authApp } from './auth/$'
import { dummyApp } from './dummy/$'

export const apiApp = appFactory.createApp()
  // Simple health check route
  .route('', apiRouteApp)

  // Auth app - you'll need to setup Kinde environment variables.
  .route('/auth', authApp)

  // A dummy app for some demos
  .route('/dummy', dummyApp)

// ### This block contains the sample code for streaming APIs,
// import type { TypedResponse } from 'hono'
// import { streamText } from 'hono/streaming'

// Do note that SST doesn't support Live Development for Lambda streaming API yet: https://sst.dev/docs/component/aws/function/#streaming

// For RPC to know the type of streamed endpoints you could manually cast it with TypedResponse 👌
// .get('/helloStream', c => streamText(c, async (stream) => {
//   await stream.writeln('Hello from Hono `/api/helloStream`!')
// }) as Response & TypedResponse<'Hello from Hono `/api/helloStream`!'>)
// ###
