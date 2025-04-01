# Product Context: starter-fullstack

This document outlines the high-level description, goals, features, and overall architecture of the `starter-fullstack` project.

## 1. Project Goal & Description

A monorepo project template designed to provide a starting point for full-stack applications using modern technologies like Nuxt (frontend), Hono (backend), SST (deployment), and pnpm/Turborepo (monorepo management).

## 2. Overall Architecture

*   **Monorepo:** Utilizes `pnpm` workspaces (`apps/*`, `packages/*`) and `Turborepo` for task orchestration.
*   **Frontend/Backend Separation:** Clear separation between `apps/frontend` (Nuxt) and `apps/backend` (Hono).
*   **Infrastructure as Code (IaC):** Optionally uses `SST (Serverless Stack Toolkit) Ion` for AWS infrastructure deployment (backend as Lambda).
*   **Environment Management:** Uses `.env` files per application managed via `dotenvx` and SST.

## 3. Key Components

### 3.1. Backend (`apps/backend`)

*   **Technology:** Node.js runtime with the Hono web framework.
*   **Deployment:** Designed for serverless deployment (AWS Lambda via SST).
*   **Core Features:** API routing, OpenAPI specification, Kinde authentication integration, ArkType runtime validation.

### 3.2. Frontend (`apps/frontend`)

*   **Technology:** Nuxt (v4 compatible) with Vue 3.
*   **Build Mode:** Defaults to Static Site Generation (SSG), SSR-capable.
*   **Core Features:** Dual UI libraries (PrimeVue & Shadcn/vue), UnoCSS styling, Tanstack Query data fetching, type-safe RPC communication with backend, Kinde authentication integration, i18n support.

### 3.3. Shared Code (`packages/`)

*   **`@local/common`:** Framework-agnostic utilities, types, dev assets.
*   **`@local/common-vue`:** Shared Vue components and utilities.
*   **`@local/locales`:** Internationalization management via CSV.
*   **`@local/tsconfig`:** Shared TypeScript configurations.
