# System Patterns & Conventions: starter-fullstack

This document details the established architectural patterns, technology choices, and coding conventions used within the `starter-fullstack` project.

## 1. Architectural Patterns

*   **Monorepo Management:** `pnpm` workspaces and `Turborepo` for build/task orchestration.
*   **Infrastructure as Code (IaC):** `SST (Serverless Stack Toolkit) Ion` for defining and deploying AWS infrastructure (optional).
*   **Backend API Structure (Hono):**
    *   Directory-based routing (`src/api/`).
    *   `$.ts` for prefix middleware/routing.
    *   `$$.ts` for exact path routes.
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
*   **Environment:** `dotenvx`.

## 3. Code Organization & Conventions

*   **Backend (`apps/backend/src`):**
    *   `api/`: Route handlers.
    *   `providers/`: External service integrations.
    *   `services/`: Business logic (convention, may not be strictly enforced yet).
    *   `helpers/`: Global utilities.
    *   `middlewares/`: Hono middleware.
    *   `.helper.ts` suffix: Local, file-specific utilities.
*   **Frontend (`apps/frontend/app`):** Follows Nuxt conventions (`components/`, `composables/`, `layouts/`, `pages/`, `plugins/`, `utils/`).
*   **Shared Packages (`packages/`):** Organized by scope (`common`, `common-vue`, `locales`, `tsconfig`).
*   **Language:** TypeScript used throughout.
*   **Modules:** ES Modules (`"type": "module"`) used project-wide.
*   **Type Safety:** High emphasis via TypeScript, shared types, and runtime validation (ArkType).
*   **Linting/Formatting:** Enforced by ESLint (`@antfu/eslint-config`) via config files and pre-commit hooks.
*   **Configuration:** Heavy reliance on configuration files (`turbo.json`, `sst.config.ts`, `nuxt.config.ts`, etc.).
