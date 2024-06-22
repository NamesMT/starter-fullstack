import en from '@local/locales/en.json'
import vi from '@local/locales/vi.json'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackWarn: false,
  fallbackLocale: 'en',
  locale: 'en',
  messages: {
    en,
    vi,
  },
  flatJson: true,
}))
