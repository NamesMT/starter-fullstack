import type { LambdaContext, LambdaEvent } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

type Bindings = {
  event: LambdaEvent
  context: LambdaContext
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/hello', c => streamText(c, async (stream) => {
  await stream.writeln('Hello from Hono `/api/hello` !')
}))

export {
  app as apiApp,
}
