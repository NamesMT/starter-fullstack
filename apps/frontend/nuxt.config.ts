import path from 'node:path'
import { localcertKeyPath, localcertPath } from '@local/common/node'
import { experimental_createPersister } from '@tanstack/query-persist-client-core'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  experimental: {
    componentIslands: true,
  },

  devServer: {
    https: {
      cert: localcertPath,
      key: localcertKeyPath,
    },
    // If you have performance issue in dev, use `127.0.0.1` in your browser instead of `localhost` - Ref: https://github.com/nuxt/cli/issues/136
    host: '127.0.0.1',
    port: 3300,
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    isSst: false,
    // Keys within public are also exposed client-side
    public: {
      backendUrl: 'https://127.0.0.1:3301',
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
    'shadcn-nuxt',
    '@namesmt/vue-query-nuxt',
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Shad',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/lib/components/ui',
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.scss',
  ],

  // nuxt-primevue
  primevue: {
    options: {
      unstyled: true,
      ripple: true,
    },
    importPT: { from: path.resolve(__dirname, './app/assets/vendor/primevue/presets/lara/') },
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
