import { defaultOptions } from 'primevue/config'

export default defineNuxtPlugin({
  name: 'local-li18n',
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

    const li18n = reactive({
      renderKey: 0,
    })

    watchImmediate(() => $i18n.locale.value, async (locale) => {
      await setDayjsLocale(locale).catch(() => { console.error(`Failed to set '${locale}' for dayjs hook`) })

      switch (locale) {
        default:
          primevue.config.locale = { ...baseLocale }
          break
      }

      ++li18n.renderKey
    })

    return {
      provide: {
        li18n,
      },
    }
  },
})
