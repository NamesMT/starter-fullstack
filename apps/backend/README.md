# backend [![NPM version](https://img.shields.io/npm/v/backend?color=a1b858&label=)](https://www.npmjs.com/package/backend)

**backend** is the main backend/API server for the project, powered by [Hono🔥](https://hono.dev/)

## Features
- [x] Easy cross-function calls / Lambda triggers support with [hono-adapter-aws-lambda](https://github.com/NamesMT/hono-adapter-aws-lambda)

## Structuring cookbook:
#### Root level:
Things like 3rd party APIs, DBs, Storages connectors, etc, should be placed in `~/providers` folder, grouped by their purpose if possible, e.g: `~/providers/auth/kinde-main.ts`, `~/providers/auth/google-main.ts`.

Things that interact with `~/providers` should be placed in `~/services` folder. (like an `user` service)

Other globally reuseable code should be placed in `~/helpers` folder.

Locally reusable code should be placed in the same folder as the file that uses it, its name should be its usable scope, suffixing the file name with `.helper`, e.g: `/api/hello.helper.ts`, `/api/app.helper.ts`.

#### `api` folder:
The main app entry of any folder should be `app.ts`.

You could create folders to group/prefix the routes, e.g: `/api/auth` folder.

Each route should be placed in a separate file according to the route path, e.g: `/api/hello.ts`, `/api/greet.ts`,  
Alternatively, you could create a `routes.ts` for multiple routes declaration in file one, e.g: `/api/auth/routes.ts`.

If you need to define routes for the current folder path, use `_.ts` for the file name.

#### Hono `app` export naming conventions:
* If the app contain routes defines, it should be named as: `<Name>RouteApp`, and it should not define the base route path on it's own, it's parent app should define the base route path for it, e.g: `/api/app.ts` `.route` other `RouteApp`s and define the base path for them.
* For other cases (i.e: main `app.ts` entry), it should be named as: `<Name>App`, and it should only `.route` other instances or `.use` middlewares, do not define routes on the `App` instance.

#### `import` ordering:
Imports should not be separated by empty lines, and should be sorted automatically by eslint.
