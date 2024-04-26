<script setup lang="ts">
import { GridMaker } from '@local/common'

const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()

const number = ref()

const apiResult = import.meta.client ? await $fetch(runtimeConfig.public.backendUrl) : 'Loading...'
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center gap-4 text-center">
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
        v-model="number"
        input-id="integeronly"
        placeholder="Number input"
      />
    </div>
    <div>
      <div>API Response from `<code>{{ runtimeConfig.public.backendUrl }}</code>`:</div>
      <pre>{{ apiResult }}</pre>
    </div>
  </div>
</template>
