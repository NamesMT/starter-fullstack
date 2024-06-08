import path from 'node:path'
import { localcertKeyPath, localcertPath } from '@local/common/node'

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
      frontendUrl: import.meta.env.NUXT_PUBLIC_FRONTEND_URL,
      backendUrl: import.meta.env.NUXT_PUBLIC_BACKEND_URL,
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
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
  ],

  ogImage: {
    enabled: true,
  },
  sitemap: {
    enabled: false,
  },
  robots: {
    enabled: false,
  },
  seoExperiments: {
    enabled: true,
  },
  schemaOrg: {
    enabled: true,
  },
  linkChecker: {
    enabled: true,
  },

  site: {
    url: import.meta.env.NUXT_PUBLIC_FRONTEND_URL,
    name: 'starter-fullstack',
    description: '🔥Hono RPC, Nuxt, SST Ion, Kinde Auth, Tanstack Query, Shadcn, Primevue, UnoCSS',
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
      },
      {
        code: 'vi',
        iso: 'vi-VN',
      },
    ],
  },

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

  telemetry: false,
})
