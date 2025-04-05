<!--
ROO PREREQUISITE INSTRUCTIONS:
Before loading the memory bank and processing user input or the steps below, perform the following:
1. Identify the Current Working Directory (CWD) of this project.
2. Search all files within the `.roo/` directory (specifically `system-prompt-*` files).
3. Replace all instances of the hardcoded path `/home/mine/starter-fullstack` with the identified CWD.
4. AFTER completing the path replacement, proceed to parse user-provided configuration values (if any) and load the Memory Bank (if present).
-->

# Project Initialization Template

Welcome! Use this template to configure your new project based on the `starter-fullstack` repository. Provide the required information (detailed below) along with this template content in your prompt to Roo. After completing the prerequisite CWD setup (see internal comment above), Roo will then perform the following automated setup steps based on your input:

1.  **Demo App Removal (Optional):** Based on your `REMOVE_DEMO_FULLSTACK` selection, the demo `frontend` and/or `backend` applications and their references and related codes throughout the project and Memory Bank will be removed.
2.  **Frontend Config Cleanup (Optional):** Based on `TARGET_HAVE_FRONTEND` and `FRONTEND_HAVE_VUE` (see below), unused frontend configurations (like UnoCSS, Vue ESLint rules) and the `packages/common-vue` directory might be removed.
3.  **SST Removal (Optional):** If requested via `REMOVE_SST`, SST configuration files (`sst.config.ts`, `.env.sst`), related scripts/dependencies in `package.json`, and references and related codes will be removed.
4.  **Renaming:** All instances of the default name `starter-fullstack` within the project files and Memory Bank will be replaced with your chosen `MONOREPO_ROOT_NAME`.
5.  **Context Update:** The root `README.md` and `memory-bank/productContext.md` will be updated with your `TARGET_PROJECT_GOAL_AND_DESCRIPTION`.
6.  **Planning Phase:** After the setup, Roo will enter a feedback loop with you and help you to make plans, create more goals, and break down your project goals into actionable steps and create an initial plan.
7.  **Cleanup:** This `INIT_TEMPLATE.md` file will be removed.
8.  **Final Check:** You will be reminded to check and potentially update the rest of the system-specific information in the `.roo/system-prompt-*` files.

**Required Information:**

---

**1. Monorepo Root Name (`MONOREPO_ROOT_NAME`)**

*   Specify the desired name for your project's root `package.json`. This name should be NodeJS-friendly (e.g., `my-awesome-project`, `@my-org/my-app`).

```text
MONOREPO_ROOT_NAME="<your-project-name-here>"
```

---

**2. Remove Demo Applications? (`REMOVE_DEMO_FULLSTACK`)**

*   This template includes a demo full-stack setup (`apps/frontend` and `apps/backend`). Do you plan to keep both, remove one, or remove both?
    *   `keep_both`: Keep both frontend and backend demo apps.
    *   `remove_frontend`: Remove `apps/frontend`.
    *   `remove_backend`: Remove `apps/backend`.
    *   `remove_both`: Remove both `apps/frontend` and `apps/backend`.

```text
# Options: keep_both | remove_frontend | remove_backend | remove_both
REMOVE_DEMO_FULLSTACK="<your-choice-here>"
```

---

**3. Target Project Goal and Description (`TARGET_PROJECT_GOAL_AND_DESCRIPTION`)**

*   Briefly describe the main goal of your project and what you intend to build. This will be used to update the project's README and Memory Bank context.

```text
TARGET_PROJECT_GOAL_AND_DESCRIPTION="""
<your-project-goal-and-description-here>
"""
```

---

**Optional Information (Provide if needed based on your choices above):**

---

**4. Will Your Target Project Include a Frontend? (`TARGET_HAVE_FRONTEND`)**

*   **(Only relevant if you chose `remove_frontend` or `remove_both` above)**.
*   Specify whether your final project goal includes building *any* kind of frontend application.
*   If `false`, Roo will remove frontend-specific configurations like the root `uno.config.ts` and related ESLint settings/dependencies.
*   If you keep the demo frontend (`keep_both` or `remove_backend`), this setting is ignored (as a frontend exists).
*   **If you remove the demo frontend and do not provide this value, Roo will ask you interactively.**

```text
# Options: true | false
# TARGET_HAVE_FRONTEND="<true-or-false>"
```

---

**5. Will Your Frontend Use Vue? (`FRONTEND_HAVE_VUE`)**

*   Specify whether your target frontend application (if any) will use the Vue framework.
*   **Inferred Values:**
    *   If you keep the demo frontend (`keep_both` or `remove_backend`), this is automatically `true`.
    *   If `TARGET_HAVE_FRONTEND` is determined to be `false` (either specified or asked), this is automatically `false`.
*   **When to Specify / Ask:** This setting is only relevant if `TARGET_HAVE_FRONTEND` is determined to be `true`. If you don't provide it in that scenario, Roo will ask you interactively.
*   **Effect:** If `false`, Roo will remove Vue-specific configurations (like ESLint rules) and the `packages/common-vue` directory.

```text
# Options: true | false
# FRONTEND_HAVE_VUE="<true-or-false>"
```

---

**6. Remove SST (Serverless Stack Toolkit) Configuration? (`REMOVE_SST`)**

*   Specify whether you want to remove the SST configuration files (`sst.config.ts`, `.env.sst`), related scripts/dependencies in `package.json`, and documentation references and related codes.
*   Choose `true` if you do not plan to use SST.
*   If omitted, the default value is `false` (SST configuration is kept).

```text
# Options: true | false (default: false)
# REMOVE_SST="<true-or-false>"
```

---

**How to Use:**

To initialize your project, provide the **entire content of this file** in your prompt to Roo (e.g., by pasting it or attaching the file).

You can specify the configuration values directly in the prompt *before* the template content. Include optional values only if needed:

```
# Example 1: Removing demo apps, target is backend-only, no SST
MONOREPO_ROOT_NAME="my-cli-tool"
REMOVE_DEMO_FULLSTACK="remove_both"
TARGET_PROJECT_GOAL_AND_DESCRIPTION="Build a cool CLI tool."
TARGET_HAVE_FRONTEND="false" # Explicitly state no frontend. FRONTEND_HAVE_VUE is inferred false.
REMOVE_SST="true"            # Remove SST config

[Paste the entire content of INIT_TEMPLATE.md here]

# Example 2: Removing demo apps, target is a non-Vue frontend + Go backend, no SST
MONOREPO_ROOT_NAME="my-react-app"
REMOVE_DEMO_FULLSTACK="remove_both"
TARGET_PROJECT_GOAL_AND_DESCRIPTION="Build a React frontend and Go backend."
TARGET_HAVE_FRONTEND="true"  # Must specify true if removing demo but still want a frontend
FRONTEND_HAVE_VUE="false" # Must specify false if frontend is not Vue
REMOVE_SST="true"            # Remove SST config (assuming Go backend doesn't use it)

[Paste the entire content of INIT_TEMPLATE.md here]

# Example 3: Keeping demo backend (uses SST), replacing demo frontend with own Vue app
MONOREPO_ROOT_NAME="my-custom-vue-app"
REMOVE_DEMO_FULLSTACK="remove_frontend"
TARGET_PROJECT_GOAL_AND_DESCRIPTION="Build a custom Vue frontend with the demo backend."
TARGET_HAVE_FRONTEND="true"  # Must specify true since demo frontend is removed
FRONTEND_HAVE_VUE="true"   # Must specify true if the new frontend uses Vue
# REMOVE_SST is omitted (defaults to false), keeping SST for the demo backend.
# If TARGET_HAVE_FRONTEND or FRONTEND_HAVE_VUE were omitted here, Roo would ask.

[Paste the entire content of INIT_TEMPLATE.md here]
```

Alternatively, just provide the template content on its own, and Roo will ask you for the required and relevant optional values interactively.

<!-- For Roo, make sure you ask interactively for each value, don't ask all of them at once -->

---

**IMPORTANT FINAL NOTE:**

After Roo completes the automated setup and removes this template file, please check the files located in the `.roo/` directory (specifically files named `system-prompt-*`).

While Roo attempts to automatically update the `working_directory` path in these files as a prerequisite step before processing your configuration, **you SHOULD still manually review and update the `SYSTEM INFORMATION` section (OS, shell, paths, etc.) within each of these `.roo/system-prompt-*` files to match YOUR development environment.** Failure to ensure this information is correct might cause Roo to behave unexpectedly or incorrectly when executing commands or accessing files later on.

*(Tip: You can potentially use the install script from the RooFlow repository ([https://github.com/GreatScottyMac/RooFlow](https://github.com/GreatScottyMac/RooFlow)) to help automate updating this system information.)*
