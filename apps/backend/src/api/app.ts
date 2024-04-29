import type { LambdaContext, LambdaEvent } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'
import { streamText } from 'hono/streaming'
import { authApp } from './auth/app'

type Bindings = {
  event: LambdaEvent
  context: LambdaContext
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/hello', c => streamText(c, async (stream) => {
  await stream.writeln('Hello from Hono `/api/hello` !')
}))

// Setup Kinde environment variables and uncomment next line to activate authentication routes
// app.route('/auth', authApp)

export {
  app as apiApp,
}
