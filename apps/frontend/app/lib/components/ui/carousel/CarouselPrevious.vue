<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { Button } from '@/lib/components/ui/button'
import { cn } from '@/lib/utils'
import { useCarousel } from './useCarousel'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="cn(
      'touch-manipulation absolute h-8 w-8 rounded-full p-0',
      orientation === 'horizontal'
        ? '-left-12 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    variant="outline"
    @pointerdown="scrollPrev"
  >
    <slot>
      <div i-lucide:arrow-left class="h-4 w-4 text-current" />
    </slot>
  </Button>
</template>
