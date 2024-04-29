import type { LambdaContext, LambdaEvent } from '@namesmt/hono-adapter-aws-lambda'
import { Hono } from 'hono'
import { streamText } from 'hono/streaming'

import type { ClaimTokenType, FlagType } from '@kinde-oss/kinde-typescript-sdk'
import { GrantType, createKindeServerClient } from '@kinde-oss/kinde-typescript-sdk'
import { env } from 'std-env'
import { sessionManager } from './sessionManager'
import { logger } from '~/logger'

type Bindings = {
  event: LambdaEvent
  context: LambdaContext
}

const app = new Hono<{ Bindings: Bindings }>()

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
  const loginUrl = await kindeClient.login(sessionManager, { org_code })
  logger.info({ loginUrl: loginUrl.toString() })
  return c.redirect(loginUrl.toString())
})

app.get('/register', async (c) => {
  const org_code = c.req.query('org_code')
  const registerUrl = await kindeClient.register(sessionManager, { org_code })
  return c.redirect(registerUrl.toString())
})

app.get('/callback', async (c) => {
  await kindeClient.handleRedirectToApp(sessionManager, new URL(c.req.url))
  return c.redirect('/')
})

app.get('/logout', async (c) => {
  const logoutUrl = await kindeClient.logout(sessionManager)
  return c.redirect(logoutUrl.toString())
})

app.get('/isAuth', async (c) => {
  const isAuthenticated = await kindeClient.isAuthenticated(sessionManager) // Boolean: true or false
  return c.body(isAuthenticated)
})

app.get('/profile', async (c) => {
  const profile = await kindeClient.getUserProfile(sessionManager)
  return c.json(profile)
})

app.get('/createOrg', async (c) => {
  const org_name = c.req.query('org_name')?.toString()
  const createUrl = await kindeClient.createOrg(sessionManager, { org_name })
  return c.redirect(createUrl.toString())
})

app.get('/getOrg', async (c) => {
  const org = await kindeClient.getOrganization(sessionManager)
  return c.json(org)
})

app.get('/getOrgs', async (c) => {
  const orgs = await kindeClient.getUserOrganizations(sessionManager)
  return c.json(orgs)
})

app.get('/getPerm/:perm', async (c) => {
  const perm = await kindeClient.getPermission(sessionManager, c.req.param('perm'))
  return c.json(perm)
})

app.get('/getPerms', async (c) => {
  const perms = await kindeClient.getPermissions(sessionManager)
  return c.json(perms)
})

// Try: /api/auth/getClaim/aud, /api/auth/getClaim/email/id_token
app.get('/getClaim/:claim/:type?', async (c) => {
  const type = (c.req.param('type') ?? 'access_token') as ClaimTokenType
  if (!/^(access_token|id_token)$/.test(type))
    return c.text('Bad request: type', 400)

  const claim = await kindeClient.getClaim(sessionManager, c.req.param('claim')!, type)
  return c.json(claim)
})

app.get('/getFlag/:code/:default?/:flagType?', async (c) => {
  const claim = await kindeClient.getFlag(
    sessionManager,
    c.req.param('code')!,
    c.req.param('default'),
    c.req.param('flagType') as keyof FlagType | undefined,
  )
  return c.json(claim)
})

app.get('/getToken', async (c) => {
  const accessToken = await kindeClient.getToken(sessionManager)
  return c.text(accessToken)
})

export {
  app as authApp,

  kindeClient,
  sessionManager,
}
