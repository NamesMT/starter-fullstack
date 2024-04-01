<script setup>
import { Gradient } from '@local/common'

const colorMode = useColorMode()

const value1 = ref()
</script>

<template>
  <div class="h-screen flex items-center justify-center gap-2">
    <Gradient class="logoGradient absolute" :conic="true" />
    <div>Theme:&nbsp;</div>
    <Button
      label="Test link"
      icon="pi pi-check"
      link
    />
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
</template>

<style>
@import url("~/assets/css/main.css");
</style>
