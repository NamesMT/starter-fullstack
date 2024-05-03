import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'pathe'

const currentDir = dirname(fileURLToPath(import.meta.url))
export const localcertPath = resolve(currentDir, `localcert.pem`)
export const localcertKeyPath = resolve(currentDir, `localcert-key.pem`)
export const localcert = readFileSync(localcertPath)
export const localcertKey = readFileSync(localcertKeyPath)
