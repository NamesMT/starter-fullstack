# backend [![NPM version](https://img.shields.io/npm/v/backend?color=a1b858&label=)](https://www.npmjs.com/package/backend)

**backend** is the main backend/API server for the project, powered by [Hono🔥](https://hono.dev/)

## Features
- [x] Easy cross-function calls / Lambda triggers support with [hono-adapter-aws-lambda](https://github.com/NamesMT/hono-adapter-aws-lambda)
- [x] OpenAPI: You can access the OpenAPI specs and Scalar UI at: http://127.0.0.1:3301/openapi/ui

## Structuring cookbook:
#### Root level:
Things like 3rd party APIs, DBs, Storages connectors, etc, should be placed in `~/providers` folder, grouped by their purpose if possible, e.g: `~/providers/auth/kinde-main.ts`, `~/providers/db/neon-main.ts`.

Things that interact with `~/providers` should be placed in `~/services` folder. (like an `user` service)

Other globally reuseable code should be placed in `~/helpers` folder.

Locally reusable code should be placed in the same folder as the file that uses it, its name should be its usable scope, suffixing the file name with `.helper`, e.g: `/api/dummy/hello.helper.ts`, `/api/$.helper.ts`.

#### `api` folder:
The idea of the api folder is to mirrors the actual api url path if possible.

The main app entry of any folder should be `$.ts`, the app entry will not define any routes but to manages which routes are enabled.

You could create folders to group/prefix the routes, e.g: `/api/auth`, `api/dummy` folder.

Each route should be placed in a separate file according to the route path, e.g: `/api/dummy/hello.ts`, `/api/dummy/greet.ts`,  
Alternatively, you could create a `$.routes.ts` for multiple routes declaration in one file, e.g: `/api/auth/$.routes.ts`.

If you need to define routes for the current folder path without any suffix route, use `$$.ts` for the file name, i.e: `/api/$$.ts`

#### Hono `app` export naming conventions:
* For main app entries ($.ts), it should be named as: `<Name>App`, and it should only `.route` other instances or `.use` middlewares, do not define routes on the `App` instance.
* If the app contain routes defines, it should be named as: `<Name>RouteApp`

#### `import` ordering:
Imports should not be separated by empty lines, and should be sorted automatically by eslint.
