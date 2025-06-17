import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Process from 'node:process';

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
              the generated files are placed in conjunction with the ROUTE
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
  const targetDir = Path.join(Process.cwd(), framework, route);
  const templateDir = Path.join(Process.cwd(), framework, 'template');

  console.log(`🚧 Scaffolding a new example at ${targetDir}`);
  console.log(`📋 Using template from ${templateDir}`);

  await Fs.mkdir(targetDir, { recursive: true });
  await copyTemplate(templateDir, targetDir, route);

  console.log(`✅ Example scaffolded successfully!`);
}

async function copyTemplate(sourceDir, targetDir, route) {
  const entries = await Fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = Path.join(sourceDir, entry.name);
    const targetPath = Path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      await Fs.mkdir(targetPath, { recursive: true });
      await copyTemplate(sourcePath, targetPath, route);
    } else {
      let content = await Fs.readFile(sourcePath, 'utf8');

      // Replace $PATH placeholder with the actual route
      content = content.replace(/\$PATH/g, route);

      await Fs.writeFile(targetPath, content);
    }
  }
}
