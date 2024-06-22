import { createContext } from 'unplugin-sheet-i18n'

// Hacky workaround to reload i18n.csv when it changes, waiting for https://github.com/privatenumber/tsx/issues/181
// @ts-expect-error it'll throw, but it's ok, we just want to hint tsx to relaod upon i18n.csv change
import('./src/i18n.csv').catch(() => null)

createContext({
  outDir: 'dist',
}).scanConvert()
