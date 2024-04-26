import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    // If you have performance issue in dev, use `127.0.0.1` in your browser instead of `localhost`
    host: '127.0.0.1',
    https: false,
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    aSecretKey: '123',
    // Keys within public are also exposed client-side
    public: {
      backendUrl: 'https://dummyjson.com/quotes/random',
    },
  },

  ignore: [
    'dist',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  vue: {
    propsDestructure: true,
  },

  modules: [
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-primevue',
  ],

  css: [
    '~/assets/css/main.scss',
    '@unocss/reset/tailwind.css',
  ],

  // nuxt-primevue
  primevue: {
    options: {
      unstyled: true,
      ripple: true,
    },
    importPT: { from: path.resolve(__dirname, './assets/vendor/primevue/presets/lara/') },
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  // @nuxtjs/color-mode
  // Removing classSuffix to match UnoCSS default selectors
  colorMode: {
    classSuffix: '',
  },

  // @nuxt/eslint
  eslint: {
    config: {
      // stylistic: true,
      standalone: false,
    },
  },
})
