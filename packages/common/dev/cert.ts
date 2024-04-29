import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'pathe'

export const localcertPath = resolve(dirname(fileURLToPath(import.meta.url)), `localcert.pem`)
export const localcertKeyPath = resolve(dirname(fileURLToPath(import.meta.url)), `localcert-key.pem`)
export const localcert = readFileSync(localcertPath)
export const localcertKey = readFileSync(localcertKeyPath)
