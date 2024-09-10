import Picocolors from 'picocolors';

const { green, blueBright, dim } = Picocolors;

import * as ChildProcess from 'node:child_process';
import * as Fs from 'node:fs';
import * as Path from 'node:path';
import * as Process from 'node:process';

// First, run Vite's normal build command to produce bundles for each example app.
ChildProcess.execSync('npx vite build', { stdio: 'inherit' });

// Then, we will copy the source code of each example as-is under the same path
// but nested in the `source/` directory.
const out = Path.join(Process.cwd(), 'dist');
const react = Path.join(Process.cwd(), 'react');
const svelte = Path.join(Process.cwd(), 'svelte');

console.log(
  blueBright('\nxyflow example-apps ') +
    green('building examples `source.json`...'),
);

const { dependencies } = JSON.parse(
  Fs.readFileSync(Path.join(Process.cwd(), 'package.json'), 'utf-8'),
);

walkExamples(react);
walkExamples(svelte);

function walkExamples(dir) {
  // If the directory contains a `dependencies.json` file, we know it's an example.
  // In that case we recursively read every file in the directory and construct
  // a JSON object mapping file paths to their content.
  if (Fs.existsSync(Path.join(dir, 'dependencies.json'))) {
    const relative = Path.relative(Process.cwd(), dir);
    const source = { files: {}, dependencies: {} };

    console.log(dim('- dist/') + green(relative) + dim('/source.json'));

    for (const file of Fs.readdirSync(dir, { recursive: true })) {
      const content = Fs.readFileSync(Path.join(dir, file), 'utf-8');

      if (file == 'dependencies.json') {
        for (const pkg of JSON.parse(content)) {
          if (!dependencies[pkg]) {
            console.log(
              `  - ${pkg} not found in package.json, ${dim(
                'it will be skipped.',
              )}`,
            );
          } else {
            source.dependencies[pkg] = dependencies[pkg];
          }
        }
      } else {
        source.files[file] = content;
      }
    }

    const json = JSON.stringify(source, null, 2);

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
