/**
 * @module @local/locales/index
 * @description this module contains reusable default i18n options/configuration and some helper goodies
 */

import type { ComposerOptions } from 'petite-vue-i18n'
import { createI18n } from 'petite-vue-i18n'
import { unref } from 'vue'

export const defaultOptions = {
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  fallbackWarn: false,
  missingWarn: false,
} satisfies ComposerOptions & { legacy: false }

/**
 * Clones a composer instance, similar to creating a "local scope", so that you can change the locale without affecting the global/original instance and do translations of many locales in parallel
 */
export function cloneComposer<C>(composer: C): C {
  const options = {} as ComposerOptions

  for (const key in composer) {
    if (key.startsWith('_'))
      continue

    // @ts-expect-error index signature blah blah
    options[key] = unref(composer[key])
  }

  return createI18n(options).global as any as C
}
