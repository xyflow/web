# xyflow example apps

## Scripts

### `pnpm dev`

Starts the vite dev server, with hot reloading. We have a custom plugin configured
to re-generate the `source.json` file whenever an example is updated, but this
will *not* hot-reload any external apps that are consuming it.

Also note that changing an example without triggering a hot-reload (eg you have
navigated to example `A` and then changed some files in example `B`) this wil
*not* trigger a re-generate of the `source.json` file.

### `pnpm scaffold`

You can run this script to generate a new React or Svelte example under a given
path. It will scaffold out all the files necessary for a new example, including
the entry `index.html` and a minimal React or Svelte component.

### `pnpm build`

Runs the `vite build` command. The same plugin that we use to generate the
`source.json` files during dev will be used here at the beginning of the build.

### `pnpm screenshots`

This command updates all preview screenshots for everything under /react and 
/svelte.
