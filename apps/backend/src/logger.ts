import { isDevelopment } from 'std-env'
import { LogLevels, createConsola } from 'consola'

export const logger = createConsola(
  {
    level: isDevelopment ? LogLevels.debug : undefined,
  },
)
