import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import { globSync } from 'glob';
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const examplesGlob = './{react,svelte}/**/{index.html,_source.js}';

export default defineConfig({
  plugins: [svelte(), react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      // Rollup expects input to be an object, but vite discards the keys and
      // uses its own system internally. Because of that we just use the index
      // of any given input as the "key".
      input: Object.fromEntries(
        globSync(examplesGlob).map((path, i) => [i, resolve(__dirname, path)]),
      ),
    },
  },
});
