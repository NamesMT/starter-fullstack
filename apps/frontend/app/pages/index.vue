<script setup lang="ts">
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/lib/components/ui/carousel'
import GridMaker from '@local/common-vue/src/components/GridMaker.vue'

defineOgImageComponent('NuxtSeo', {
  title: `Hello! I'm starter-fullstack 👋`,
  description: 'Hono RPC, Nuxt, SST Ion, Kinde Auth, Tanstack Query, Shadcn, Primevue, UnoCSS',
  theme: '#bf83fc',
  colorMode: 'dark',
})

definePageMeta({
  title: 'pages.title.home',
})

const { t, locale, setLocale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()
const { $apiClient, $auth } = useNuxtApp()

const number = ref()

// API
const { data: apiResult, error: apiError } = await useLazyAsyncData(
  'apiResult',
  () => hcParse($apiClient.api.dummy.hello.$get()),
  {
    server: false,
    default: () => 'Loading...' as const,
  },
)

// Tanstack Query
const queryClient = useQueryClient()
const { isPending, isError, data, error } = useQuery({
  queryKey: ['hello_test'],
  queryFn: () => hcParse($apiClient.api.dummy.hello.$get()),
})
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
          <span>
            ...
          </span>
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

      <div :key="$li18n.renderKey">
        {{ dayjs().format('dddd') }}
      </div>
    </div>

    <div>
      <div>Configured frontendUrl: {{ runtimeConfig.public.frontendUrl }}</div>
      <div>Configured backendUrl: {{ runtimeConfig.public.backendUrl }}</div>
      <div>API Response from `<code>{{ $apiClient.api.dummy.hello.$url() }}</code>`:</div>
      <pre class="rounded bg-black p-2 px-4 text-left text-white">{{ apiError || apiResult || 'Empty' }}</pre>
    </div>

    <div>
      <div>Tanstack Query result (fetched client-side and persisted to IndexedDB for 12 hours)</div>
      <pre class="rounded bg-black p-2 px-4 text-left text-white">{{ isPending ? 'Loading...' : isError ? error : data }}</pre>
      <Button
        class="mt-2"
        label="Make stale (refetch)"
        @pointerdown="queryClient.invalidateQueries({ queryKey: ['hello_test'] })"
      />
    </div>

    <div>
      <ClientOnly>
        <template #fallback>
          <div>Auth status: ...</div>
        </template>
        <div>Auth status: {{ $auth.loggedIn ? 'Logged in' : 'Not logged in' }}</div>
        <template v-if="$auth.loggedIn">
          <div>User information:</div>
          <pre class="max-w-60vw overflow-hidden text-ellipsis rounded bg-black p-2 px-4 text-left text-white">{{ $auth }}</pre>
        </template>
        <div class="mt-2 flex items-center justify-center gap-2">
          <Button v-if="$auth.loggedIn" label="Sign-out" @pointerdown="navigateTo(getSignOutUrl(), { external: true })" />
          <Button v-else label="Sign-in" @pointerdown="navigateTo(getSignInUrl(), { external: true })" />
        </div>
      </ClientOnly>
    </div>

    <Carousel class="relative max-w-xs w-full">
      <CarouselContent>
        <!-- You could either explicitly import the shadcn components or use them with 'Shad' auto-import prefix -->
        <ShadCarouselItem v-for="(_, index) in 5" :key="index">
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
        </ShadCarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <div>
      <IsSST />
    </div>
  </div>
</template>
