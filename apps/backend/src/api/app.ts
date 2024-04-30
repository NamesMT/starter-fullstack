import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

import { authApp } from './auth/app'
import type { HonoEnv } from '~/types'

// Setup Kinde environment variables and uncomment all "$Auth" blocks to activate authentication routes

const app = new Hono<HonoEnv>()

// // $Auth
// app.route('/auth', authApp)

app.get('/hello', c => streamText(c, async (stream) => {
  await stream.writeln('Hello from Hono `/api/hello` !')
}))

export {
  app as apiApp,
}
