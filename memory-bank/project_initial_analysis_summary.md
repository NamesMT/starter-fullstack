# Project Analysis Summary: starter-fullstack

This document summarizes the architecture, technologies, and coding conventions of the `starter-fullstack` monorepo project based on analysis of its configuration and key source files.

## 1. Overall Architecture

*   **Monorepo:** The project utilizes a monorepo structure managed by `pnpm` workspaces (`apps/*`, `packages/*`) and orchestrated by `Turborepo` for task running (`build`, `dev`, `lint`, `deploy`) and caching.
*   **Frontend/Backend Separation:** Clear separation between the `apps/frontend` (Nuxt) and `apps/backend` (Hono) applications.
*   **Infrastructure as Code (IaC):** Uses `SST (Serverless Stack Toolkit) Ion` for defining and deploying AWS infrastructure. Currently configured to deploy the backend as an AWS Lambda function with a Function URL. SST usage is optional.
*   **Environment Management:** Uses `.env` files per application (`.env`, `.env.local`, `.env.prod.local`) managed via `dotenvx` integrated into `pnpm` scripts and `sst.config.ts`.

## 2. Backend (`apps/backend`)

*   **Technology Stack:** Node.js runtime, built with [Hono](https://hono.dev/) web framework.
*   **Deployment:** Designed to be deployed as a serverless function on AWS Lambda via SST.
*   **API Structure:**
    *   Follows a defined structure mirroring URL paths within `src/api/`.
    *   Uses `$.ts` files for managing middleware and routing for path prefixes (e.g., `api/auth/$.ts`).
    *   Uses `$$.ts` for routes matching the exact folder path.
    *   Employs a factory pattern (`appFactory`, `triggerFactory`) for app creation and potentially handling triggers.
    *   Provides OpenAPI specification generation and UI (`@scalar/hono-api-reference`) accessible at `/openapi/ui`.
*   **Authentication:** Integrates [Kinde](https://kinde.com/) for authentication using `@kinde-oss/kinde-typescript-sdk`. Uses a cookie-based session management strategy (`hono-sessions`) configured in `src/middlewares/session.ts`. Kinde environment variables are injected via SST.
*   **Type Safety:** Emphasizes runtime type safety using [ArkType](https://arktype.io/) integrated with Hono via `@hono/arktype-validator`.
*   **Code Organization:** Follows conventions outlined in `README.md`:
    *   `providers/`: External service connectors (e.g., Kinde).
    *   `services/`: Business logic.
    *   `helpers/`: Global utilities (logging, error handling).
    *   `.helper.ts`: Local, file-specific utilities.
*   **Testing:** Uses `Vitest` for testing.

## 3. Frontend (`apps/frontend`)

*   **Technology Stack:** [Nuxt](https://nuxt.com/) (v4 compatibility) with Vue 3.
*   **Build Mode:** Defaults to Static Site Generation (SSG) (`nuxt generate`) but is SSR-capable (`nuxt build`).
*   **UI Libraries:** Uses two UI libraries concurrently:
    *   [PrimeVue](https://primevue.org/): A comprehensive, traditional UI library.
    *   [Shadcn/vue](https://www.shadcn-vue.com/) (via `shadcn-nuxt`): A component-based library built on Radix Vue, allowing installation of individual components. Theming is integrated via UnoCSS and shared CSS variables.
*   **Styling:** Uses [UnoCSS](https://unocss.dev/), an atomic CSS engine, with multiple presets (`@unocss/preset-uno`, icons, typography, web-fonts, animations, shadcn). Shared theming (e.g., primary color) is managed via CSS variables defined in UnoCSS config and CSS files, used by both PrimeVue and Shadcn.
*   **State Management/Data Fetching:** Uses [Tanstack Query (Vue Query)](https://tanstack.com/query/latest/docs/vue/overview) via `@namesmt/vue-query-nuxt` for client-side data fetching and caching, with persistence to IndexedDB (`idb-keyval`).
*   **API Communication:** Interacts with the backend via a type-safe RPC client (`hono/client`). Type sharing is enabled through TypeScript project references (`tsconfig.json` references `../backend`). API calls are proxied during development (`h3-proxy`).
*   **Authentication:** Includes the `@kinde-oss/kinde-typescript-sdk`, likely used within composables (`app/composables/auth.ts`) to interact with Kinde on the client-side.
*   **Nuxt Modules:** Leverages various Nuxt modules: `@nuxt/eslint`, `@vueuse/nuxt`, `@nuxtjs/i18n`, `@nuxtjs/seo`, `@unocss/nuxt`, `@nuxtjs/color-mode`, `@nuxt/image`, `@primevue/nuxt-module`, `shadcn-nuxt`, `nuxt-llms`.
*   **Local Development:** Runs on `https://127.0.0.1:3300` using self-signed certificates from `@local/common`.

## 4. Shared Code (`packages/`)

*   **`@local/common`:** Contains framework-agnostic utilities, constants, types, and development assets (e.g., local SSL certificates in `dev/`).
*   **`@local/common-vue`:** Shares Vue-specific components (e.g., `GridMaker.vue`), composables, or utilities intended for use in Vue applications. Includes its own `uno.config.ts`.
*   **`@local/locales`:** Manages internationalization (i18n). Uses `unplugin-sheet-i18n` to process a CSV spreadsheet (`src/i18n.csv`) into locale files during build/dev time.
*   **`@local/tsconfig`:** Provides shared base TypeScript configuration files (`base.json`, `vue.json`) extended by applications and other packages.

## 5. Coding Style & Conventions

*   **Language:** TypeScript is used consistently across the entire monorepo.
*   **Linting & Formatting:** Uses ESLint with `@antfu/eslint-config` as the base, integrated with Nuxt ESLint and UnoCSS plugins. Enforces code style, formatting, and import sorting. Pre-commit hooks (`simple-git-hooks`, `lint-staged`) run ESLint.
*   **Type Safety:** Strong emphasis on type safety, evidenced by TypeScript usage, project references for type sharing, and runtime validation with ArkType in the backend.
*   **ES Modules:** The project uses ES Modules (`"type": "module"`) throughout.
*   **Configuration:** Relies heavily on convention and configuration files (`turbo.json`, `sst.config.ts`, `nuxt.config.ts`, `uno.config.ts`, `eslint.config.js`).
