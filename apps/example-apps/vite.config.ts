import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import { globSync } from 'glob';
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const examplesGlob = './{react,svelte}/**/index.html';
const examples = globSync(examplesGlob);

export default defineConfig({
  plugins: [svelte(), react()],
  server: {
    host: '0.0.0.0',
    cors: true,
  },
  build: {
    rollupOptions: {
      // Rollup expects input to be an object, but vite discards the keys and
      // uses its own system internally. Because of that we just use the index
      // of any given input as the "key".
      input: Object.fromEntries(
        examples.map((path, i) => [i, resolve(__dirname, path)]),
      ),
    },
  },
});
