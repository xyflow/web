# Svelte Examples

Serving all Svelte examples & guides for the documentation pages of xyflow.

## Creating new examples

1. Create new folder under `src/routes/examples` or `src/routes/guides`. The name of the folder corresponds to the subsequent route.
2. Create file named `+page.svelte` with the example code. This will become the `App.svelte` on the doc page.
3. Rerun `pnpm run dev` or run `pnpm run create:endpoints` to create all nessecary POST endpoints.

### Note

`pnpm run create:endpoints` either creates or overwrites a `+server.ts` in every route where a `+page.svelte` exists. This implements an endpoint where a POST request returns a json with `{ filename: fileAsString }`. To modify the generated endpoint, edit `templates/+server.ts`.
