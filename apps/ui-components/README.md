# React Flow components for shadcn/cli

This application is used for developing and publishing new components that can be installed by running the shadcn cli.

## Adding components

```bash
npx shadcn init # initialize shadcn
npx shadcn add http://ui.reactflow.dev/<component-name>.json ## adding component
```

## Developing new components

We have an initialization script that can be run via

```bash
pnpm add-component <component-name>
```

This adds the following files:

```bash
components/
├─ xy/
│  ├─ <component-name>/
│  │  ├─ index.tsx      # source code of the component
│  │  ├─ demo.tsx       # small demo showing usage to appear on website
│  │  ├─ registry.json  # shadcn configuration
app/
├─ <component-name>/
│  ├─ page.tsx          # route for rendering component

```

## Deploying components

Inside the `scripts/` folder you will find a script called `generate-registry.js`. This script is executed when running `pnpm build`. It generates registry files for the cli (`regsitry/<component-name>.json`), as well as a `demo/<component-name>.json` file with the example code for each component and saves them inside the `public/` folder. This way by building and deploying the app we can directly host all neccessary files needed for the cli and integrating it with our website.
