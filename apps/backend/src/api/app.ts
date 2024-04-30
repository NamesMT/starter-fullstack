import type { TypedResponse } from 'hono'
import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

import { authApp } from './auth/app'
import type { HonoEnv } from '~/types'

// Setup Kinde environment variables and uncomment all "$Auth" blocks to activate authentication routes

const app = new Hono<HonoEnv>()
  // // $Auth
  .route('/auth', authApp)

  // For RPC to know the type of streamed endpoints you could manually cast it with TypedResponse 👌
  .get('/hello', c => streamText(c, async (stream) => {
    await stream.writeln('Hello from Hono `/api/hello`!')
  }) as Response & TypedResponse<'Hello from Hono `/api/hello`!'>)

export {
  app as apiApp,
}
