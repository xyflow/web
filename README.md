![xyflow](https://github.com/xyflow/web/assets/3797215/9b251e22-c555-41c6-b754-943b8ee2ec5f)

# XYFlow Websites and Docs

This monorepo contains our [website + docs](https://xyflow.com) and [pro platform](https://pro.xyflow.com). You can find the websites in the [/sites](sites) directory.

## What's inside?

This Turborepo includes the following packages/apps. All internal / private packages are prefixed with `xy-`.

### Apps

- [`docs`](apps/docs): the xyflow website that contains landingpages and documentation
  - built with [NextJS](https://nextjs.org/) and [Nextra](https://nextra.site/)
- [`platform`](apps/platform): the pro platform used by our subscribers to create subscriptions and access their subscription features
  - built with [NextJS](https://nextjs.org/)
  - [nhost](https://nhost.io) is being used for authentication, database and serverless functions
  - payment infrastructure via [stripe](https://stripe.com)
- [`xy-styleguide`](apps/xy-styleguide): A storybook app for exploring and documenting our internal ui components

### Packages

- [`xy-ui`](packages/xy-ui): our custom component library that contains ui components that are shared across our apps
- [`xy-tailwind-config`](packages/xy-tailwind-config): contains shared tailwind configuration
- [`eslint-config-xyflow`](packages/xy-eslint-config): `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- [`xy-tsconfig`](packages/xy-tsconfig): `tsconfig.json`s used throughout the monorepo

## Getting started

To run one of the websites locally, you need to install the dependencies and packages:

```sh
pnpm install
```

Now you can start the app that you want to work on with one of these commands:

```sh
pnpm run dev:xyflow.com # runs the xyflow website on localhost:3001

pnpm run dev:reactflow.dev # runs the React Flow website and docs on localhost:3002

pnpm run dev:svelteflow.dev # runs the Svelte Flow website and docs on localhost:3003

pnpm run dev:pro.xyflow.com # runs the React Flow Pro website on localhost:3000

pnpm run dev:style # runs a storybook for inspecting our ui components on localhost:6006
```

## Branches and Previews

If you work on a feature, create a feature branch from `staging`.

- `main` is the production branch. Commits get deployed automatically to:
  - [https://xyflow-docs.vercel.app/](https://xyflow-docs.vercel.app/)
  - [https://xyflow-platform.vercel.app/](https://xyflow-platform.vercel.app/)
- `staging` is used for previewing the next release:
  - [https://xyflow-docs-staging.vercel.app/](https://xyflow-docs-staging.vercel.app/)
  - [https://xyflow-platform-staging.vercel.app/](https://xyflow-platform-staging.vercel.app/)

## Showcases

In order to update the showcase section, you need to run `pnpm showcase` in the `apps/docs` folder.
