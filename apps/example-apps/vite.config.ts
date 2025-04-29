import react from '@vitejs/plugin-react';

import * as Fs from 'node:fs';
import * as Path from 'node:path';
import * as Process from 'node:process';

import { defineConfig, Plugin } from 'vite';
import { globSync } from 'glob';
import { resolve } from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// make index.css entrypoints, too to fix css import odering issues
const examplesGlob = './{react,svelte}/**/{index.html,index.css}';
const examples = globSync(examplesGlob);

export default defineConfig({
  plugins: [injectXYTheme(), generatePublicAssets(), svelte(), react()],
  server: {
    host: '0.0.0.0',
    cors: true,
  },
  build: {
    rollupOptions: {
      // Rollup expects input to be an object, but vite discards the keys and
      // uses its own system internally. Because of that we just use the index
      // of any given input as the "key".
      input: {
        index: resolve(__dirname, 'index.html'),
        ...Object.fromEntries(examples.map((path, i) => [i, resolve(__dirname, path)])),
      },
    },
  },
});

function generatePublicAssets(): Plugin {
  let examples = { react: [] as string[], svelte: [] as string[] };

  return {
    name: 'generate-public-assets',
    options() {
      examples = { react: [], svelte: [] };
      walkExamples(Path.join(Process.cwd(), 'react'), (dir) => {
        const relative = Path.relative(Process.cwd(), dir);
        examples.react.push(relative);
        generateAssetsForExample(dir);
      });

      walkExamples(Path.join(Process.cwd(), 'svelte'), (dir) => {
        const relative = Path.relative(Process.cwd(), dir);
        examples.svelte.push(relative);
        generateAssetsForExample(dir);
      });

      Fs.writeFileSync(Path.join(out, 'all.json'), JSON.stringify(examples, null, 2));
    },
    handleHotUpdate({ modules }) {
      if (!modules.length) return modules;
      let dir = Path.dirname(modules[0].file!);

      while (!Fs.existsSync(Path.join(dir, 'index.html'))) {
        dir = Path.join(dir, '..');
      }

      walkExamples(dir, generateAssetsForExample);

      return modules;
    },
  };
}

const out = Path.join(Process.cwd(), 'public');
const { dependencies } = JSON.parse(
  Fs.readFileSync(Path.join(Process.cwd(), 'package.json'), 'utf-8'),
);

function walkExamples(dir: string, cb: (dir: string) => void = generateAssetsForExample) {
  // If the directory contains a `dependencies.json` file, we know it's an example.
  // In that case we recursively read every file in the directory and construct
  // a JSON object mapping file paths to their content.
  if (Fs.existsSync(Path.join(dir, 'dependencies.json'))) {
    cb(dir);
  }

  // Otherwise, we recursively walk any subdirectories until we find an example
  // or hit a dead end.
  else {
    for (const file of Fs.readdirSync(dir, { withFileTypes: true })) {
      if (file.isDirectory()) {
        walkExamples(Path.join(dir, file.name), cb);
      }
    }
  }
}

function generateAssetsForExample(dir: string) {
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
    } else if (file === 'preview.jpg') {
      Fs.cpSync(filePath, Path.join(out, relative, 'preview.jpg'));
    } else if (
      file === 'index.css' &&
      content.startsWith("@import url('./xy-theme.css')")
    ) {
      const content = Fs.readFileSync(getSharedThemePath(dir), 'utf-8');
      source.files['xy-theme.css'] = content;
    } else {
      source.files[file] = content;
    }
  }

  const json = JSON.stringify(source, null, 2);

  Fs.mkdirSync(Path.join(out, relative), { recursive: true });
  Fs.writeFileSync(Path.join(out, relative, 'source.json'), json);
}

function injectXYTheme(): Plugin {
  return {
    name: 'inject-xy-theme-css',
    enforce: 'pre',
    async transform(code, id) {
      if (id.endsWith('index.css')) {
        return code.replace('./xy-theme.css', getSharedThemePath(id));
      }
      return code;
    },
  };
}

function getSharedThemePath(dir: string) {
  const framework = dir.includes('react') ? 'react' : 'svelte';
  return resolve(__dirname, `themes/${framework}-theme.css`);
}
