## xyflow | React Flow | Svelte Flow docs

This folder contains the source code of the [xyflow website](https://xyflow.com). It is built with [nextra](https://nextra.site/).

### Installation

```
$ pnpm install
```

### Development

This starts a dev server on http://localhost:3002

- navbar/sidebar/mobile nav links can be changed in [src/app/_meta.global.tsx file](./src/app/_meta.global.ts)
- There are 3 layouts:
  - root layout is defined in [src/app/layout.tsx](./src/app/layout.tsx) file
  - `Content` and `Pro` layouts have different links and buttons in navbar and links in footer
    - [src/app/(content-pages)/layout.tsx](./src/app/(content-pages)/layout.tsx) file
    - [src/app/pro/layout.tsx](./src/app/pro/layout.tsx) file
- MDX documents are defined in [content](./content) directory. They are displayed via [src/app/(content-pages)/[...mdxPath]/page.tsx](./src/app/(content-pages)/[...mdxPath]/page.tsx) dynamic page.
- MDX components are defined in [src/mdx-components.tsx](./src/mdx-components.tsx) file
- Open Graph Image is placed in [src/app/opengraph-image.jpg](./src/app/opengraph-image.jpg) file

```
$ pnpm start
```

### Build

```
$ pnpm build
```
