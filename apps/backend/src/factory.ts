import { createFactory } from 'hono/factory'
import type { HonoEnv } from '~/types'

export const appFactory = createFactory<HonoEnv>()
