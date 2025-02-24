## xyflow | React Flow | Svelte Flow docs

This folder contains the source code of the [xyflow website](https://xyflow.com). It is built with [nextra](https://nextra.site/).

### Installation

```
$ pnpm install
```

### Development

This starts a dev server on http://localhost:3002

- Navigation links for the navbar, sidebar, and mobile navigation can be modified in the [src/app/\_meta.global.tsx](./src/app/_meta.global.ts) file.
- The project includes six layouts:
  - The **root layout** is defined in [src/app/layout.tsx](./src/app/layout.tsx).
  - The **Content** and **Pro** layouts have distinct navbar links, buttons, and footer links:
    - [src/app/(content-pages)/layout.tsx](<./src/app/(content-pages)/layout.tsx>)
    - [src/app/pro/layout.tsx](./src/app/pro/layout.tsx)
  - Additionally, there are three specialized layouts within [src/app/(content-pages)/[...mdxPath]/page.tsx](<./src/app/(content-pages)/[...mdxPath]/page.tsx>) for:
    - `/examples`
    - `/learn/tutorials`
    - and `/pro/case-studies` pages.
- **MDX documents** are stored in the [content](./content) directory and rendered through the dynamic page at [src/app/(content-pages)/[...mdxPath]/page.tsx](<./src/app/(content-pages)/[...mdxPath]/page.tsx>).
- **MDX components** are defined in [src/mdx-components.tsx](./src/mdx-components.tsx).
- The **Open Graph Image** is located at [src/app/opengraph-image.jpg](./src/app/opengraph-image.jpg).

```
$ pnpm start
```

### Build

```
$ pnpm build
```
