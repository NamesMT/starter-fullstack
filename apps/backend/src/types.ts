import type { LambdaContext, LambdaEvent } from '@namesmt/hono-adapter-aws-lambda'
import type { Session } from 'hono-sessions'

type Bindings = {
  event: LambdaEvent
  context: LambdaContext
}

export interface HonoEnv {
  Bindings: Bindings
  Variables: {
    session: Session
    session_key_rotation: boolean
  }
}
