import antfu from '@antfu/eslint-config'
// @ts-expect-error cannot find module
import frontendConfig from 'frontend/eslintConfig'

async function asyncWrap() {
  return await antfu(
    {
      typescript: true,
      vue: true,
      unocss: true,
      ignores: [
        '**/assets/primevue/presets**',
      ],
    },
    // Include @nuxt/eslint configs
    await frontendConfig(),
    // Allow trailing space for markdown formatting
    {
      files: ['*.md'],
      rules: {
        'style/no-trailing-spaces': 'off',
      },
    },
    {
      rules: {
      // Allow trailing space in comments, for possible JSDoc formattings
        'style/no-trailing-spaces': ['error', { ignoreComments: true }],
        // Relaxes inline statements a bit
        'style/max-statements-per-line': ['error', { max: 2 }],
      },
    },
  )
}

export default asyncWrap()
