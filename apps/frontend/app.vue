<script setup lang="ts">
import { GridMaker } from '@local/common-vue'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/components/ui/carousel'

const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()
const { $apiClient, $auth } = useNuxtApp()

const number = ref()

const { data: apiResult } = useLazyAsyncData('apiResult', () => hcText($apiClient.api.hello.$get()), { default: () => 'Loading...' as const })

const authApiStatus = $auth.health ? 'Activated' : 'Not found'
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
      <div>Configured backendUrl: {{ runtimeConfig.public.backendUrl }}</div>
      <div>API Response from `<code>{{ $apiClient.api.hello.$url() }}</code>` (proxied to backendUrl):</div>
      <pre class="rounded bg-black p-2 px-4 text-left text-white">{{ apiResult || 'Empty' }}</pre>
    </div>

    <div>
      <div>Auth API status: {{ authApiStatus }}</div>
      <template v-if="$auth && authApiStatus === 'Activated'">
        <div>User information:</div>
        <pre class="rounded bg-black p-2 px-4 text-left text-white">{{ $auth }}</pre>
        <div class="mt-2">
          <Button v-if="$auth.loggedIn" label="Sign-out" @click="navigateTo('/api/auth/logout', { external: true })" />
          <Button v-else label="Sign-in" @click="navigateTo('/api/auth/login', { external: true })" />
        </div>
      </template>
    </div>

    <Carousel class="relative max-w-xs w-full">
      <CarouselContent>
        <CarouselItem v-for="(_, index) in 5" :key="index">
          <div class="p-1">
            <Card>
              <template #title>
                Simple Card #{{ index }}
              </template>
              <template #content>
                <p class="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                  quas!
                </p>
              </template>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <div>
      <IsSST />
    </div>
  </div>
</template>
