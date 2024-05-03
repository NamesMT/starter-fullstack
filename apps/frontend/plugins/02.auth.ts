import type { UserType } from '@kinde-oss/kinde-typescript-sdk'

export type AuthState = { loggedIn: true, user: UserType } | { loggedIn: false, user: null }

export default defineNuxtPlugin(async () => {
  const { $apiClient } = useNuxtApp()
  const authApi = $apiClient.api.auth

  const health = await hcText(authApi.health.$get()).catch(() => false)
  const isLoggedIn = health && await hcJson(authApi.isAuth.$get())
  const profile = isLoggedIn ? await hcJson(authApi.profile.$get()) : null

  // For some reason if the state is typed as AuthState, TS will just stop working, keeping as untyped
  const state = useState('authStatePlugin', shallowRef)

  state.value = {
    health,
    loggedIn: isLoggedIn,
    user: profile,
  }

  return {
    name: 'local-auth',
    dependsOn: [
      ['local-rpcApi'],
    ],
    provide: {
      auth: state.value as AuthState & { health: boolean },
    },
  }
})
