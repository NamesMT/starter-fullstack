import { GrantType, createKindeServerClient } from '@kinde-oss/kinde-typescript-sdk'
import { env } from 'std-env'

// Client for authorization code flow
export const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: env.KINDE_DOMAIN!,
  clientId: env.KINDE_CLIENT_ID!,
  clientSecret: env.KINDE_CLIENT_SECRET!,
  redirectURL: env.KINDE_REDIRECT_URI!,
  logoutRedirectURL: env.KINDE_LOGOUT_REDIRECT_URI!,
})

// // Client for client credentials flow
// export const kindeApiClient = createKindeServerClient(GrantType.CLIENT_CREDENTIALS, {
//   authDomain: env.KINDE_DOMAIN!,
//   clientId: env.KINDE_CLIENT_ID!,
//   clientSecret: env.KINDE_CLIENT_SECRET!,
//   logoutRedirectURL: env.KINDE_LOGOUT_REDIRECT_URI!,
// })
