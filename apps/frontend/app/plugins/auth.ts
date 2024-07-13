import type { UserType } from '@kinde-oss/kinde-typescript-sdk'
import type { Reactive } from 'vue'

export type AuthState = { loggedIn: true, user: UserType } | { loggedIn: false, user: null }

// The current plugin targets SSG and CSR, if you use SSR, you need to converts it to useState and useAsyncData for optimized performance

export default defineNuxtPlugin({
  name: 'local-auth',
  parallel: true,
  dependsOn: [
    'local-rpcApi',
  ],
  async setup() {
    const { $apiClient } = useNuxtApp()
    const authApi = $apiClient.api.auth

    const auth = reactive({
      loggedIn: false,
      user: null,
    }) as Reactive<AuthState>

    async function refreshAuth() {
      const profile = await hcParse(authApi.profile.$get()).catch(() => null)

      if (profile) {
        auth.loggedIn = true
        auth.user = profile
      }
      else {
        auth.loggedIn = false
        auth.user = null
      }

      // Refresh every 15 minutes
      if (import.meta.client)
        setTimeout(refreshAuth, 1000 * 60 * 15)
    }

    await refreshAuth()

    return {
      provide: {
        auth,
      },
    }
  },
})
