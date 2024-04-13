<script setup>
import { GridMaker } from '@local/common'

const colorMode = useColorMode()

const value1 = ref()
</script>

<template>
  <div class="h-screen flex flex-col gap-4 items-center justify-center">
    <div class="flex gap-2 items-end">
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
    <div class="flex gap-2 items-center justify-center">
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
