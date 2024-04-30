import { Hono } from 'hono'
import type { ClaimTokenType, FlagType } from '@kinde-oss/kinde-typescript-sdk'
import { GrantType, createKindeServerClient } from '@kinde-oss/kinde-typescript-sdk'
import { env } from 'std-env'

import { getSessionManager } from './sessionManager'
import type { HonoEnv } from '~/types'

const app = new Hono<HonoEnv>()

// Client for authorization code flow
const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: env.KINDE_DOMAIN!,
  clientId: env.KINDE_CLIENT_ID!,
  clientSecret: env.KINDE_CLIENT_SECRET!,
  redirectURL: env.KINDE_REDIRECT_URI!,
  logoutRedirectURL: env.KINDE_LOGOUT_REDIRECT_URI!,
})

// // Client for client credentials flow
// const kindeApiClient = createKindeServerClient(GrantType.CLIENT_CREDENTIALS, {
//   authDomain: env.KINDE_DOMAIN!,
//   clientId: env.KINDE_CLIENT_ID!,
//   clientSecret: env.KINDE_CLIENT_SECRET!,
//   logoutRedirectURL: env.KINDE_LOGOUT_REDIRECT_URI!,
// })

app.get('/login', async (c) => {
  const org_code = c.req.query('org_code')
  const loginUrl = await kindeClient.login(getSessionManager(c), { org_code })
  return c.redirect(loginUrl.toString())
})

app.get('/register', async (c) => {
  const org_code = c.req.query('org_code')
  const registerUrl = await kindeClient.register(getSessionManager(c), { org_code })
  return c.redirect(registerUrl.toString())
})

app.get('/callback', async (c) => {
  await kindeClient.handleRedirectToApp(getSessionManager(c), new URL(c.req.url))
  return c.redirect('/')
})

app.get('/logout', async (c) => {
  const logoutUrl = await kindeClient.logout(getSessionManager(c))
  return c.redirect(logoutUrl.toString())
})

app.get('/isAuth', async (c) => {
  const isAuthenticated = await kindeClient.isAuthenticated(getSessionManager(c)) // Boolean: true or false
  return c.body(isAuthenticated)
})

app.get('/profile', async (c) => {
  const profile = await kindeClient.getUserProfile(getSessionManager(c))
  return c.json(profile)
})

app.get('/createOrg', async (c) => {
  const org_name = c.req.query('org_name')?.toString()
  const createUrl = await kindeClient.createOrg(getSessionManager(c), { org_name })
  return c.redirect(createUrl.toString())
})

app.get('/getOrg', async (c) => {
  const org = await kindeClient.getOrganization(getSessionManager(c))
  return c.json(org)
})

app.get('/getOrgs', async (c) => {
  const orgs = await kindeClient.getUserOrganizations(getSessionManager(c))
  return c.json(orgs)
})

app.get('/getPerm/:perm', async (c) => {
  const perm = await kindeClient.getPermission(getSessionManager(c), c.req.param('perm'))
  return c.json(perm)
})

app.get('/getPerms', async (c) => {
  const perms = await kindeClient.getPermissions(getSessionManager(c))
  return c.json(perms)
})

// Try: /api/auth/getClaim/aud, /api/auth/getClaim/email/id_token
app.get('/getClaim/:claim/:type?', async (c) => {
  const type = (c.req.param('type') ?? 'access_token') as ClaimTokenType
  if (!/^(access_token|id_token)$/.test(type))
    return c.text('Bad request: type', 400)

  const claim = await kindeClient.getClaim(getSessionManager(c), c.req.param('claim')!, type)
  return c.json(claim)
})

app.get('/getFlag/:code/:default?/:flagType?', async (c) => {
  const claim = await kindeClient.getFlag(
    getSessionManager(c),
    c.req.param('code')!,
    c.req.param('default'),
    c.req.param('flagType') as keyof FlagType | undefined,
  )
  return c.json(claim)
})

app.get('/getToken', async (c) => {
  const accessToken = await kindeClient.getToken(getSessionManager(c))
  return c.text(accessToken)
})

export {
  app as authApp,

  kindeClient,
}
