import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  theme: {
    ringWidth: {
      DEFAULT: '3px',
    },
    colors: {
      // Used by both shadcn and primevue
      'primary': {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },

      'primary-inverse': 'hsl(var(--primary-inverse))',
      'primary-hover': 'hsl(var(--primary-hover))',
      'primary-active-color': 'hsl(var(--primary-active-color))',

      'primary-highlight': 'hsl(var(--primary)/var(--primary-highlight-opacity))',
      'primary-highlight-inverse': 'hsl(var(--primary-highlight-inverse))',
      'primary-highlight-hover': 'hsl(var(--primary)/var(--primary-highlight-hover-opacity))',

      'primary-50': 'hsl(var(--primary-50))',
      'primary-100': 'hsl(var(--primary-100))',
      'primary-200': 'hsl(var(--primary-200))',
      'primary-300': 'hsl(var(--primary-300))',
      'primary-400': 'hsl(var(--primary-400))',
      'primary-500': 'hsl(var(--primary-500))',
      'primary-600': 'hsl(var(--primary-600))',
      'primary-700': 'hsl(var(--primary-700))',
      'primary-800': 'hsl(var(--primary-800))',
      'primary-900': 'hsl(var(--primary-900))',
      'primary-950': 'hsl(var(--primary-950))',

      'surface-0': 'hsl(var(--surface-0))',
      'surface-50': 'hsl(var(--surface-50))',
      'surface-100': 'hsl(var(--surface-100))',
      'surface-200': 'hsl(var(--surface-200))',
      'surface-300': 'hsl(var(--surface-300))',
      'surface-400': 'hsl(var(--surface-400))',
      'surface-500': 'hsl(var(--surface-500))',
      'surface-600': 'hsl(var(--surface-600))',
      'surface-700': 'hsl(var(--surface-700))',
      'surface-800': 'hsl(var(--surface-800))',
      'surface-900': 'hsl(var(--surface-900))',
      'surface-950': 'hsl(var(--surface-950))',
    },
  },
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  rules: [
    // Declaring css variable with Uno: $SOMETHING=10px
    [/^\$(.+?)\-\[(.+)\]$/, ([, name, value]) => ({
      [`--${name}`]: value,
    })],
    // Re-declare to fix priority issue with some primevue components
    ['rounded-none', { 'border-radius': '0px' }],
  ],
  variants: [
    {
      // nth-[]:class
      name: ':nth-child()',
      match: (matcher) => {
        const match = matcher.match(/^nth-\[(.+?)\]:/)
        if (!match)
          return matcher
        return {
          // slice `hover:` prefix and passed to the next variants and rules
          matcher: matcher.substring(match[0].length),
          selector: s => `${s}:nth-child(${match[1]})`,
        }
      },
      multiPass: true,
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Chivo',
        mono: 'Chivo Mono',
      },
    }),
    presetAnimations(),
    presetShadcn({ color: false, radius: false }, false),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // Primevue tailwind preset
        'assets/vendor/primevue/presets/**',
        // shadcn js/ts files
        'lib/components/ui/**/*.{js,ts}',
      ],
    },
  },
})
