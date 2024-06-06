<script setup lang="ts">
import { GridMaker } from '@local/common-vue'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/components/ui/carousel'

definePageMeta({
  title: 'pages.title.home',
})

const { t, locale, setLocale } = useI18n()

const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()
const { $apiClient, $auth } = useNuxtApp()

const number = ref()

// API
const { data: apiResult } = await useLazyAsyncData(
  'apiResult',
  () => hcText($apiClient.api.hello.$get()),
  {
    server: false,
    default: () => 'Loading...' as const,
  },
)

// Tanstack Query
const queryClient = useQueryClient()
const { isPending, isError, data, error } = useQuery({
  queryKey: ['hello_test'],
  queryFn: () => hcText($apiClient.api.hello.$get()),
})

// Auth API
const authApiStatus = $auth.health ? 'Activated' : 'Not found'
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4 py-4 text-center">
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
      <ClientOnly>
        <template #fallback>
          <Button
            label="..."
          />
        </template>

        <Button
          :label="colorMode.preference"
          @pointerdown="colorMode.preference = (colorMode.preference !== 'dark')
            ? 'dark'
            : 'light'"
        />
      </ClientOnly>
      <InputNumber
        v-model="number"
        input-id="integeronly"
        placeholder="Number input"
      />
      <div>{{ t('language') }}:&nbsp;</div>
      <Button
        :label="locale"
        @pointerdown="setLocale(locale === 'en' ? 'vi' : 'en')"
      />
    </div>

    <div>
      <div>Configured backendUrl: {{ runtimeConfig.public.backendUrl }}</div>
      <div>API Response from `<code>{{ $apiClient.api.hello.$url() }}</code>` (proxied to backendUrl):</div>
      <pre class="rounded bg-black p-2 px-4 text-left text-white">{{ apiResult || 'Empty' }}</pre>
    </div>

    <div>
      <div>Tanstack Query result (this is fetched client-side and persisted to IndexedDB for 12 hours)</div>
      <pre class="rounded bg-black p-2 px-4 text-left text-white">{{ isPending ? 'Loading...' : isError ? error : data }}</pre>
      <Button
        class="mt-2"
        label="Make stale (refetch)"
        @pointerdown="queryClient.invalidateQueries({ queryKey: ['hello_test'] })"
      />
    </div>

    <div>
      <div>Auth API status: {{ authApiStatus }}</div>
      <template v-if="$auth && authApiStatus === 'Activated'">
        <div>User information:</div>
        <pre class="rounded bg-black p-2 px-4 text-left text-white">{{ $auth }}</pre>
        <div class="mt-2">
          <Button v-if="$auth.loggedIn" label="Sign-out" @pointerdown="navigateTo('/api/auth/logout', { external: true })" />
          <Button v-else label="Sign-in" @pointerdown="navigateTo('/api/auth/login', { external: true })" />
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
