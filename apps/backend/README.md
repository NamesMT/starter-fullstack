# backend [![NPM version](https://img.shields.io/npm/v/backend?color=a1b858&label=)](https://www.npmjs.com/package/backend)

**backend** is the main backend/API server for the project, powered by [Hono🔥](https://hono.dev/)

## Features
- [x] Easy cross-function calls / Lambda triggers support with [hono-adapter-aws-lambda](https://github.com/NamesMT/hono-adapter-aws-lambda)
- [x] OpenAPI: You can access the OpenAPI specs and Scalar UI at: https://127.0.0.1:3301/openapi/ui

*You can view the OpenAPI UI live demo here: https://4yjbmxiunrnigwewec4twf4zl40izfde.lambda-url.ap-southeast-1.on.aws/openapi/ui*

## Structuring cookbook:
#### Root level:
Things like 3rd party APIs, DBs, Storages connectors, etc, should be placed in `~/providers` folder, grouped by their purpose if possible, e.g: `~/providers/auth/kinde-main.ts`, `~/providers/db/neon-main.ts`.

Things that interact with `~/providers` should be placed in `~/services` folder. (like an `user` service)

Other globally reuseable code should be placed in `~/helpers` folder.

Locally reusable code should be placed in the same folder as the file that uses it, its name should be its usable scope, suffixing the file name with `.helper`, e.g: `/api/dummy/hello.helper.ts`, `/api/$.helper.ts`.

#### `api` folder:
The idea of the api folder is to mirrors the actual api url path if possible, i.e: an API endpoint at `://example.com/api/dummy/hello` should be placed in `/src/api/dummy/hello.ts`.

The root app entry of the backend is `/src/app.ts`. (*app entry means an Hono app instance*)

If an api prefix requires some common middlewares applied, then it should defines a main app entry as `$.ts` file at the prefix that the middleware applies, routes of this prefix will now be managed by this `$.ts` (called main app entry), instead of the root app entry, e.g: `/api/auth/$.ts`.

Root and main app entries will not define any routes but to manage middlewares and which routes are enabled (in other words, the app entries should only `.use` middlewares and `.route` routes).

If a folder prefix already exists and you need to define routes for the current folder path without any suffix route, use `$$.ts` for the file name, do not define a file with the same name as the folder on the parent, i.e: do `/api/dummy/$$.ts` instead of `/api/dummy.ts`.

Again, the recommended structure is to mirror the api url path, but, if for some reason like migrating an old app over that have multiple routes defined in the same file, you should create a `$.routes.ts` for multiple routes declaration in one file, e.g: `/api/auth/$.routes.ts`.

#### Hono `app` export naming conventions:
* Root and main app entries (app.ts, $.ts) should be named as: `<Name>App`, and it should only `.route` other instances or `.use` middlewares, do not define routes on the `App` instance.
* For other app entries, a.k.a routes defines, it should be named as: `<Name>RouteApp`, i.e: `/api/dummy/hello.ts` should be named as `dummyHelloRouteApp`/`helloRouteApp`.
