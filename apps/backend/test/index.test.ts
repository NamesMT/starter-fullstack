import { expect, it } from 'vitest'
import { logger } from '~/helpers/logger'

it('logger', () => {
  expect(logger).toHaveProperty('info')
})
