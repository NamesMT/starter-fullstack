# System Patterns & Conventions: starter-monorepo

This document details the established architectural patterns, technology choices, and coding conventions used within the `starter-monorepo` project.

## 1. Architectural Patterns

*   **Monorepo Management:** `pnpm` workspaces and `Turborepo` for build/task orchestration.
*   **Infrastructure as Code (IaC):** `SST (Serverless Stack Toolkit) Ion` for defining and deploying AWS infrastructure (optional).
*   **Backend API Structure (Hono):**
    *   Directory-based routing (`src/api/`) mirroring URL paths (e.g., `/api/dummy/hello` maps to `src/api/dummy/hello.ts`).
    *   `$.ts` for prefix middleware/routing management within a directory.
    *   `$$.ts` for defining routes at the exact directory path (e.g., `src/api/users/$$.ts` for `/api/users`).
    *   `$.routes.ts` for defining multiple related routes within a single file in a directory (e.g., `src/api/auth/$.routes.ts`).
    *   Factory pattern (`appFactory`, `triggerFactory`) for application setup.
*   **Frontend UI Strategy:** Concurrent use of PrimeVue (comprehensive) and Shadcn/vue (composable) UI libraries.
*   **Frontend State/Data Fetching:** Tanstack Query (Vue Query) for client-side caching and data fetching, with IndexedDB persistence.
*   **Frontend API Proxy:** Nuxt frontend proxies API calls to the backend when running on the same domain (dev/prod parity).
*   **Type-Safe API Communication:** Hono RPC client (`hono/client`) used in the frontend, leveraging TypeScript project references for shared types.
*   **Internationalization (i18n):** Centralized management in `@local/locales` using `unplugin-sheet-i18n` to process a CSV file (`src/i18n.csv`).

## 2. Technology Choices & Key Libraries

*   **Backend:** Node.js, Hono, ArkType (validation), Kinde (auth), `hono-sessions` (session management), Vitest (testing).
*   **Frontend:** Nuxt (Vue 3), PrimeVue, Shadcn/vue, UnoCSS, Tanstack Query, Kinde (auth), `@nuxtjs/i18n`.
*   **Monorepo/Build:** pnpm, Turborepo, TypeScript, ESLint (`@antfu/eslint-config`), `simple-git-hooks`, `lint-staged`.
*   **Deployment:** SST Ion (optional, for AWS Lambda).
*   **Environment:** 
    * Uses `dotenvx` to load `.env` files.
    * Common env files are not ignored by git (e.g: `.env`, `.env.local`), ignore pattern is `.env.*.ignored`
    * MUST define local secrets in `.env.local.ignored`.
*   **Local Development:** `mkcert` for generating local SSL certificates (`localcert`).

## 3. Code Organization & Conventions

*   **Backend (`apps/backend/src`) - Structuring Cookbook:**
    *   `providers/`: External service integrations, e.g: 3rd-party APIs, DBs, Storages (e.g., `providers/auth/kinde-main.ts`).
    *   `services/`: Business logic interacting with `providers/`.
    *   `helpers/`: Globally reusable utilities (e.g., `error`, `logger`).
    *   `middlewares/`: Hono middleware.
    *   `api/`: Route handlers, mirroring URL structure.
    *   `.helper.ts` suffix: Utilities local to the file/directory they reside in (e.g., `api/dummy/hello.helper.ts`).
    *   **Hono App Naming:**
        *   Root/Main entries (`app.ts`, `$.ts`): `<Name>App` (manage middleware/routing).
        *   Route definitions (`hello.ts`, `$$.ts`, `$.routes.ts`): `<Name>RouteApp` (define actual routes).
*   **Frontend (`apps/frontend/app`):** Follows Nuxt conventions (`components/`, `composables/`, `layouts/`, `pages/`, `plugins/`, `utils/`).
*   **Shared Packages (`locals/`):** Organized by scope (`common`, `common-vue`, `locales`, `tsconfig`).
*   **Language:** TypeScript used throughout.
*   **Modules:** ES Modules (`"type": "module"`) used project-wide.
*   **Type Safety:** High emphasis via TypeScript, shared types, and runtime validation (ArkType).
*   **Linting/Formatting:** Enforced by ESLint (`@antfu/eslint-config`) via config files and pre-commit hooks. Includes automatic import sorting.
*   **Configuration:** Heavy reliance on configuration files (`turbo.json`, `sst.config.ts`, `nuxt.config.ts`, etc.).
*   **AI Development:** Setup for Roo Code AI Agent, including prompting rules (`.roo/`, `.roomodes`), Memory Bank (`memory-bank/`) and initialization prompt (`INIT_PROMPT.md`).
*   **Caching:** Turborepo Remote Caching can be enabled via `npx turbo login` and `npx turbo link`.
