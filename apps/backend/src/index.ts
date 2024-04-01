import { handle } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'

const app = new Hono()

app.notFound(c => c.text('four-o-four'))

export const handler = handle(app)
export * from './logger'
