Directory Structure
├──[.husky] — Contains hooks to ensure Git commits meet the linting & test criteria.
├──[.vitest] — Configuration files related to Vite's testing utilities.
├──[.vscode] — VSCode settings including code snippets, recommended extensions etc.
├──[public] — Static assets that are served as-is without any processing (e.g., HTML files, images).
├──[src] — Source code of the application.
├────[assets] — Static files like images, fonts which are directly used in the source code.
├────[components] — Reusable React components.
├────[constants] — Contains constant values and configurations used throughout the application.
├────[hooks] — Custom hooks and utilities to encapsulate and reuse stateful logic across your application.
├────[locales] — Translation files for supporting multiple languages in the app.
├────[pages] — Components/pages which represent an entire screen in your application.
├────[routes] — Configuration or components related to routing in your application.
├────[store] — Holds state management logic, typically using libraries like Redux or MobX. This directory includes actions, reducers, and store configuration for managing global application state.
├────[theme] — Theme related configurations or components, potentially for styling or theming the app.
├────[types] — TypeScript type definitions and interfaces.
├────[utility] — Utility functions and common helpers used across the app.
├──[.eslintrc.cjs] — Configuration file for ESLint, determining linting rules and behaviors.
├──[.prettierrc] — Configuration for Prettier, the code formatter.
├──[tailwind.config.js] — Configuration file for TailwindCSS, a utility-first CSS framework.
├──[tsconfig.json] — Configuration for TypeScript compiler options.
├──[vite.config.ts] — Configuration file for Vite, a build tool and development server.

Requirements
[Node.js] v20.0+
[pnpm] npm i -g pnpm
[VS Code] editor with recommended extensions
Optionally [React Developer Tools] browser extensions
Getting Started
$ pnpm install
$ pnpm prepare
$ pnpm dev
The app will become available at http://localhost:5173/

Scripts
pnpm dev — Launches the app in development mode using Vite.
pnpm build — Validates the code using TypeScript compiler, then compiles and bundles the app for production using Vite.
pnpm lint — Validates the code using ESLint with specific extensions and configurations.
pnpm format — Formats code using Prettier.
pnpm preview — Previews the built app with Vite.

How to Update
pnpm outdated — Checks and lists dependencies that are outdated or have newer versions available.
pnpm up [dep-name] — Updates a specific dependency to its latest version.
pnpm up --latest or pnpm up [dep-name] --latest — Updates all dependencies in your project to their latest versions.
Best Practices
Reusable components are placed in the 'components' folder.
Maintain stable references using useMemo, useCallback, and memo.
Do not use colors, fonts, or spacings other than those in the theme.
Update dependencies at least once a month.
Avoid creating huge components; adhere to the single responsibility principle.
Aim to create pure components; the Container/Presentation Components pattern can help.
Try to avoid the prop drilling pattern and use Context API instead.
Do not use class components.
Try to use lazy loading (@loadable/component) when loading components or libraries.
Before proceeding with API integration, it is important to refresh the schema using the generate command.