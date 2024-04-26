<script setup>
import { GridMaker } from '@local/common'

const colorMode = useColorMode()

const value1 = ref()
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center gap-4">
    <div class="flex items-end gap-2">
      <GridMaker
        :value="[
          '* *',
          '***',
          '* *',
        ]"
      />
      <GridMaker
        class="[&_.GridMaker\_\_col]:nth-[1]:[&_.GridMaker\_\_row]:rounded-full"
        :value="[
          '*',
          '*',
          '*',
          '*',
        ]"
      />
    </div>
    <div class="flex items-center justify-center gap-2">
      <div>Theme:&nbsp;</div>
      <Button
        :label="colorMode.preference"
        @click="colorMode.preference = (colorMode.preference !== 'dark')
          ? 'dark'
          : 'light'"
      />
      <InputNumber
        v-model="value1"
        input-id="integeronly"
        placeholder="Test input"
      />
    </div>
  </div>
</template>

<style>
@import url("~/assets/css/main.css");
</style>
