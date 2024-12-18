import { createConsola, LogLevels } from 'consola'
import { isDevelopment } from 'std-env'

export const logger = createConsola(
  {
    level: isDevelopment ? LogLevels.debug : undefined,
  },
)
