<script setup lang="ts">
import type { LooseCSSUnit } from '@local/common/src/utils/css'
import { cssUnit } from '@local/common/src/utils/css'
import { computed } from 'vue'

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
    <div v-for="row, rowIndex of value" :key="rowIndex" class="GridMaker__row flex gap-$GAP-X">
      <div
        v-for="col, colIndex of row.split('')" :key="colIndex" class="h-$SIZE w-$SIZE" :class="[
          col !== ' '
            ? ['GridMaker__col', elementClass]
            : 'GridMaker__col--inactive',
        ]"
      />
    </div>
  </div>
</template>
