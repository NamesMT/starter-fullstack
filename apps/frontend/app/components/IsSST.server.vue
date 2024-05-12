<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <div>Is running devSST: {{ runtimeConfig.isSst }}</div>
</template>
