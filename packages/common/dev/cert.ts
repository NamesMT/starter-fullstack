import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'pathe'

const currentDir = dirname(fileURLToPath(import.meta.url))
export const localcertPath = resolve(currentDir, `localcert.pem`)
export const localcertKeyPath = resolve(currentDir, `localcert-key.pem`)
