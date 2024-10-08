import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Process from 'node:process';

import { appJs, deps, ext, indexCss, indexHtml, indexJs } from './utils.js';

const [framework, route] = Process.argv.slice(2);

if (!framework || !route) {
  console.log(`
The scaffold script helps you quickly put together a new example for either
reactflow.dev or svelteflow.dev by copying over the boilerplate. All arguments
are *required*.

USAGE:

  pnpm scaffold <FRAMEWORK> <ROUTE>

EXAMPLES:

  pnpm scaffold react blog/web-audio/demo

  pnpm scaffold svelte guides/getting-started

ARGUMENTS:

  FRAMEWORK   'react' | 'svelte'

              The framework the example will be written in. This affects where
              the generated files are placed in conjuction with the ROUTE
              argument.

  ROUTE       string

              The route fragment the example app will be served at when combined
              with the FRAMEWORK argument. For example, calling the script as
              \`pnpm scaffold react examples/nodes/custom-node\` will scaffold
              the example and make it accessible at
              '/react/examples/nodes/custom-node/index.html'.
  `);

  Process.exit(1);
} else {
  main();
}

// MAIN ------------------------------------------------------------------------

async function main() {
  const dir = Path.join(Process.cwd(), framework, route);

  console.log(`🚧 Scaffolding a new example at ${dir}`);

  await Fs.mkdir(dir, { recursive: true });
  await Fs.writeFile(Path.join(dir, 'index.html'), indexHtml());
  await Fs.writeFile(
    Path.join(dir, framework === 'react' ? 'index.css' : 'styles.css'),
    indexCss(),
  );
  await Fs.writeFile(
    Path.join(dir, `index.${ext({ framework })}`),
    indexJs(framework),
  );
  await Fs.writeFile(
    Path.join(dir, `App.${ext({ kind: 'app', framework })}`),
    appJs(framework),
  );
  await Fs.writeFile(Path.join(dir, 'dependencies.json'), deps({ framework }));
}
