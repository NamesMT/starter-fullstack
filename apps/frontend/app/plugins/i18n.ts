import { defaultOptions } from 'primevue/config'

export default defineNuxtPlugin({
  name: 'local-i18n',
  parallel: true,
  dependsOn: [
    'local-auth',
  ],
  async setup() {
    const { $i18n } = useNuxtApp()
    const primevue = usePrimeVue()

    const baseLocale = {
      ...defaultOptions.locale!,
      firstDayOfWeek: 1,
    }

    watchImmediate(() => $i18n.locale.value, async (locale) => {
      // @ts-expect-error locale might not be defined
      await setDayjsLocale(locale).catch(() => { console.error(`Failed to set '${locale}' for dayjs hook`) })

      switch (locale) {
        default:
          primevue.config.locale = { ...baseLocale }
          break
      }
    })
  },
})
