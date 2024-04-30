import type { UserType } from '@kinde-oss/kinde-typescript-sdk'
import {
  createFetch,
} from 'ofetch'

export type AuthState = { loggedIn: true, user: UserType } | { loggedIn: false, user: null }

export default defineNuxtPlugin(async () => {
  const { $apiClient } = useNuxtApp()
  const authApi = $apiClient.api.auth

  const isLoggedIn = await hcRes(authApi.isAuth.$get())
  const profile = isLoggedIn ? await hcRes(authApi.profile.$get()) : null

  // For some reason if the state is typed as AuthState, TS will just stop working, keeping as untyped
  const state = useState('my-shallow-state', shallowRef)

  state.value = {
    loggedIn: isLoggedIn,
    user: profile,
  }

  return {
    name: 'local-auth',
    dependsOn: [
      ['local-rpcApi'],
    ],
    provide: {
      auth: state.value as AuthState,
    },
  }
})
