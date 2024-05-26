# starter-fullstack

This is a starter template to kick-start your `Nuxt` full-stack project

Note: the app comes with a `localcert` SSL for local development, generated with [mkcert](https://github.com/FiloSottile/mkcert), you can install mkcert's local CA to remove the untrusted SSL warning 

## What's inside?

⏩ This template is powered by [Turborepo](https://turbo.build/repo).

😊 Out-of-the-box, this repo is configured for an SSG `frontend` Nuxt app, and a `backend` Hono app that will be the main API, to optimize on cost and simplicity.
- Simply change the `apps/frontend`'s build script to `nuxt build` to enable SSR building

🌩️ Utilizing [SST Ion](https://ion.sst.dev/) for Infrastructure-as-Code, with powerful [Live](https://ion.sst.dev/docs/live/) development.  
- SST is 100% opt-in, by using `sst` CLI commands yourself, like `sst dev`,  
simply remove `sst` dependency and `sst.config.ts` if you want to use another solution.  
- *currently only `backend` app is configured, which will deploy a Lambda with Function URL enabled*

🔐 Comes with fully-configured [**Kinde**](https://kinde.com/) [typescript-sdk](https://github.com/kinde-oss/kinde-typescript-sdk), see: `/apps/backend/api/auth`
- *Add your env variables, activate the auth routes, profit$*

### Apps and Packages

- [`frontend`](./apps/frontend/README.md): a [Nuxt](https://nuxt.com/) app, configured same as [starter-nuxt](https://github.com/NamesMT/starter-nuxt).
  - By default, `/api/*` routes is proxied to the `backendUrl`.
  - The `rpcApi` plugin will call the `/api/*` proxy if they're on the same domain (e.g: 127.0.0.1)
    - > this mimics a production environment where the static frontend and the backend lives on the same domain at /api, which is the most efficient configuration for Cloudfront + Lambda Function Url
    - If the `frontend` and `backend` are on different domains then the backend will be called directly without proxy.
    - This could be configured in frontend's [`app.config.ts`](./apps/frontend/app/app.config.ts)
- [`backend`](./apps/backend/README.md): a [Hono🔥](https://hono.dev/) app.
- `@local/common`: a shared library that can contain constants, functions, types shared across all apps.
- `@local/common-vue`: a shared library that can contain components, constants, functions, types shared across vue-based apps.
- `tsconfig`: `tsconfig.json`s used throughout the monorepo.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting

### Build

To build all apps and packages, run the following command:  
`pnpm run build`

### Develop

To develop all apps and packages, run the following command:  
`pnpm run dev`

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
