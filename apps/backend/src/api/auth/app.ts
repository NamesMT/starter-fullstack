import { Hono } from 'hono'
import type { ClaimTokenType, FlagType } from '@kinde-oss/kinde-typescript-sdk'

import { kindeClient } from './kindeClients'
import { getSessionManager } from './sessionManager'
import type { HonoEnv } from '~/types'

const app = new Hono<HonoEnv>()
  .get('/health', async (c) => {
    return c.text('Good', 200)
  })

  .get('/login', async (c) => {
    const org_code = c.req.query('org_code')
    const loginUrl = await kindeClient.login(getSessionManager(c), { org_code })
    return c.redirect(loginUrl.toString())
  })

  .get('/register', async (c) => {
    const org_code = c.req.query('org_code')
    const registerUrl = await kindeClient.register(getSessionManager(c), { org_code })
    return c.redirect(registerUrl.toString())
  })

  .get('/callback', async (c) => {
    await kindeClient.handleRedirectToApp(getSessionManager(c), new URL(c.req.url))
    return c.redirect('/')
  })

  .get('/logout', async (c) => {
    const logoutUrl = await kindeClient.logout(getSessionManager(c))
    return c.redirect(logoutUrl.toString())
  })

  .get('/isAuth', async (c) => {
    const isAuthenticated = await kindeClient.isAuthenticated(getSessionManager(c)) // Boolean: true or false
    return c.json(isAuthenticated)
  })

  .get('/profile', async (c) => {
    const profile = await kindeClient.getUserProfile(getSessionManager(c))
    return c.json(profile)
  })

  .get('/createOrg', async (c) => {
    const org_name = c.req.query('org_name')?.toString()
    const createUrl = await kindeClient.createOrg(getSessionManager(c), { org_name })
    return c.redirect(createUrl.toString())
  })

  .get('/getOrg', async (c) => {
    const org = await kindeClient.getOrganization(getSessionManager(c))
    return c.json(org)
  })

  .get('/getOrgs', async (c) => {
    const orgs = await kindeClient.getUserOrganizations(getSessionManager(c))
    return c.json(orgs)
  })

  .get('/getPerm/:perm', async (c) => {
    const perm = await kindeClient.getPermission(getSessionManager(c), c.req.param('perm'))
    return c.json(perm)
  })

  .get('/getPerms', async (c) => {
    const perms = await kindeClient.getPermissions(getSessionManager(c))
    return c.json(perms)
  })

  // Try: /api/auth/getClaim/aud, /api/auth/getClaim/email/id_token
  .get('/getClaim/:claim', async (c) => {
    const type = (c.req.query('type') ?? 'access_token') as ClaimTokenType
    if (!/^(access_token|id_token)$/.test(type))
      return c.text('Bad request: type', 400)

    const claim = await kindeClient.getClaim(getSessionManager(c), c.req.param('claim'), type)
    return c.json(claim)
  })

  .get('/getFlag/:code', async (c) => {
    const claim = await kindeClient.getFlag(
      getSessionManager(c),
      c.req.param('code'),
      c.req.query('default'),
      c.req.query('flagType') as keyof FlagType | undefined,
    )
    return c.json(claim)
  })

  .get('/getToken', async (c) => {
    const accessToken = await kindeClient.getToken(getSessionManager(c))
    return c.text(accessToken)
  })

export {
  app as authApp,
}
