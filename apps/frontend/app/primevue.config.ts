import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

export const Names = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'hsl(var(--primary-50))',
      100: 'hsl(var(--primary-100))',
      200: 'hsl(var(--primary-200))',
      300: 'hsl(var(--primary-300))',
      400: 'hsl(var(--primary-400))',
      500: 'hsl(var(--primary-500))',
      600: 'hsl(var(--primary-600))',
      700: 'hsl(var(--primary-700))',
      800: 'hsl(var(--primary-800))',
      900: 'hsl(var(--primary-900))',
      950: 'hsl(var(--primary-950))',
    },
  },
})
