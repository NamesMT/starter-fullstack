import en from '@local/locales/dist/en.json'
import vi from '@local/locales/dist/vi.json'
import { defaultOptions } from '@local/locales/src/index'
import { createI18n } from 'petite-vue-i18n'

export const i18n = createI18n({
  ...defaultOptions,
  messages: {
    en,
    vi,
  },
})

export const i18nComposer = i18n.global
