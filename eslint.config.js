import antfu from '@antfu/eslint-config'
import frontendNuxtConfig from 'frontend/.nuxt/eslint.config.mjs'

export default frontendNuxtConfig(await antfu(
  {
    typescript: true,
    vue: true,
    unocss: true,
    ignores: [
      '.sst',
    ],
  },
  {
    files: ['apps/backend/**'],
    rules: {
      // Disable automatically transform `type` to `interface`, because Hono require the Bindings to be type.
      'ts/consistent-type-definitions': 'off',
    },
  },
  {
    rules: {
      // Allow trailing space in comments, for possible JSDoc formattings
      'style/no-trailing-spaces': ['error', { ignoreComments: true }],
      // Relaxes inline statements a bit
      'style/max-statements-per-line': ['error', { max: 2 }],
      // Allow top-level await
      'antfu/no-top-level-await': 'off',
    },
  },
  // Allow trailing space for markdown formatting
  {
    files: ['**/*.md'],
    rules: {
      'style/no-trailing-spaces': 'off',
    },
  },
))
