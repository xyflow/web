## xyflow | React Flow | Svelte Flow docs

This folder contains the source code of the [xyflow website](https://xyflow.com). It is built with [nextra](https://nextra.site/).

### Installation

```
$ pnpm install
```

### Development

This starts a dev server on http://localhost:3002

- navbar/sidebar/mobile nav links can be changed in [src/app/_meta.global.tsx file](./src/app/_meta.global.ts)
- There are 2 layouts with different navbar links and buttons and footer links
  - [src/app/(content-pages)/layout.tsx](./src/app/(content-pages)/layout.tsx) 
  - [src/app/pro/layout.tsx](./src/app/pro/layout.tsx) 

```
$ pnpm start
```

### Build

```
$ pnpm build
```
