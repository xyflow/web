import react from '@vitejs/plugin-react';

import * as Fs from 'node:fs';
import * as Path from 'node:path';
import * as Process from 'node:process';

import { defineConfig, Plugin } from 'vite';
import { globSync } from 'glob';
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const examplesGlob = './{react,svelte}/**/index.html';
const examples = globSync(examplesGlob);

export default defineConfig({
  plugins: [generatePublicAssets(), svelte(), react()],
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

//

function generatePublicAssets(): Plugin {
  return {
    name: 'generate-public-assets',
    options() {
      walkExamples(Path.join(Process.cwd(), 'react'));
      walkExamples(Path.join(Process.cwd(), 'svelte'));
    },
    handleHotUpdate({ modules }) {
      if (!modules.length) return modules;
      let dir = Path.dirname(modules[0].file!);

      while (!Fs.existsSync(Path.join(dir, 'index.html'))) {
        console.log(dir);
        dir = Path.join(dir, '..');
      }

      walkExamples(dir);

      return modules;
    },
  };
}

const out = Path.join(Process.cwd(), 'public');
const { dependencies } = JSON.parse(
  Fs.readFileSync(Path.join(Process.cwd(), 'package.json'), 'utf-8'),
);

function walkExamples(dir: string) {
  // If the directory contains a `dependencies.json` file, we know it's an example.
  // In that case we recursively read every file in the directory and construct
  // a JSON object mapping file paths to their content.
  if (Fs.existsSync(Path.join(dir, 'dependencies.json'))) {
    const relative = Path.relative(Process.cwd(), dir);
    const source = { files: {}, dependencies: {} };

    for (const file of Fs.readdirSync(dir, {
      recursive: true,
      encoding: 'utf-8',
    })) {
      const filePath = Path.join(dir, file);
      if (Fs.lstatSync(filePath)?.isDirectory()) continue;

      const content = Fs.readFileSync(filePath, 'utf-8');

      if (file == 'dependencies.json') {
        for (const pkg of JSON.parse(content)) {
          if (!dependencies[pkg]) continue;

          source.dependencies[pkg] = dependencies[pkg];
        }
      } else {
        source.files[file] = content;
      }
    }

    const json = JSON.stringify(source, null, 2);

    Fs.mkdirSync(Path.join(out, relative), { recursive: true });
    Fs.writeFileSync(Path.join(out, relative, 'source.json'), json);
  }

  // Otherwise, we recursively walk any subdirectories until we find an example
  // or hit a dead end.
  else {
    for (const file of Fs.readdirSync(dir, { withFileTypes: true })) {
      if (file.isDirectory()) {
        walkExamples(Path.join(dir, file.name));
      }
    }
  }
}
