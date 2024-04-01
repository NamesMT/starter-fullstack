import { expect, it } from 'vitest'
import { logger } from '~/logger'

it('logger', () => {
  expect(logger).toHaveProperty('info')
})
