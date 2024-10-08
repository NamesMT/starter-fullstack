# Nuxt 3 ~~Minimal~~ Preconfigured Starter

## Features:
- ESLint
  - [@nuxt/eslint](https://eslint.nuxt.com/packages/module)
  - [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [UnoCSS](https://unocss.dev/guide/)
  - UnoCSS is an atomic CSS engine, similar to Tailwind but is super fast and have some amazing features like automatically imported icons in pure CSS.
- Tanstack Query
  - Default is configured for client-side fetching usage, data is persisted to IndexedDB.
- PrimeVue
- Shadcn/vue
  - > Why two UI libraries? - the way shadcn works in reality is that you only installs what you use, instead of you installing "embla-carousel" and implements a Carousel component yourself, shadcn will help you do it, and provides you with some pre-made document, wrappers component and their styling system, so it will not bloat the application compared to cases like PrimeVue + Vuetify.
  - Configured for UnoCSS with [hyoban/unocss-preset-shadcn](https://github.com/hyoban/unocss-preset-shadcn).
  - Share the primary color and could work in parallel with PrimeVue.
  - Note: `lucide-vue-next` (icon pack) is not pre-installed, you can:
    - Install `lucide-vue-next`
    -  Convert usage of `lucide-vue-next` icons to UnoCSS icons (Recommended)
- [ColorMode](https://github.com/nuxt-modules/color-mode)
  - Dark and Light mode with auto detection made easy with Nuxt.
- [NuxtImage](https://image.nuxt.com/)
  - Automatically optimized images for the app, as well as placeholder support.
- [NuxtI18n](https://i18n.nuxtjs.org/)
  - Internationalization (i18n) module for Nuxt.js + SEO headers.
- [Nuxt SEO](https://nuxtseo.com/)
  - All the boring SEO work for Nuxt done.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup
## Development Server
Please refer to monorepo root [README](../../README.md)

## Production
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
