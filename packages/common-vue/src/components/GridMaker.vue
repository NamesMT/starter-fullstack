<script setup lang="ts">
import { computed } from 'vue'
import type { LooseCSSUnit } from '@local/common'
import { cssUnit } from '@local/common'

const {
  value,
  size = 16,
  gapX = 4,
  gapY = 4,
  elementClass = 'bg-current',
} = defineProps<{
  value: string[]
  gapX?: LooseCSSUnit
  gapY?: LooseCSSUnit
  size?: LooseCSSUnit
  elementClass?: string
}>()

const sizeUnit = computed(() => cssUnit(size))
const gapXUnit = computed(() => cssUnit(gapX))
const gapYUnit = computed(() => cssUnit(gapY))
</script>

<template>
  <div
    class="flex flex-col gap-$GAP-Y font-mono" :style="{
      '--SIZE': sizeUnit,
      '--GAP-X': gapXUnit,
      '--GAP-Y': gapYUnit,
    }"
  >
    <div v-for="row, _index of value" :key="_index" class="GridMaker__row flex gap-$GAP-X">
      <div
        v-for="col, _index of row.split('')" :key="_index" class="h-$SIZE w-$SIZE" :class="[
          col !== ' '
            ? ['GridMaker__col', elementClass]
            : 'GridMaker__col--inactive',
        ]"
      />
    </div>
  </div>
</template>
