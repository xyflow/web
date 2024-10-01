import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Url from 'node:url';

// ES modules in node don't support the `__dirname` global, but we can recover it
// with some help from the `Url` module.
//
// see: https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
const __dirname = Url.fileURLToPath(new URL('.', import.meta.url));

const OUTPUT_PATH = Path.resolve(__dirname, '../src/utils/routes.ts');
const ROUTES_PATH = Path.resolve(__dirname, '../src/pages');

export async function extractRoutes(path = '/', set = new Set()) {
  const dir = `${ROUTES_PATH}/${path}`;

  for (const dirent of await Fs.readdir(dir, { withFileTypes: true })) {
    if (dirent.name === '_meta.ts') continue;
    if (dirent.name === '404.mdx') continue;
    if (dirent.name === '_app.tsx') continue;

    if (dirent.isDirectory()) {
      await extractRoutes(`${path}/${dirent.name}`, set);
    } else if (dirent.name === 'index.mdx') {
      set.add(Path.normalize(path));
    } else {
      set.add(Path.normalize(`${path}/${dirent.name.replace(/\.mdx$/, '')}`));
    }
  }

  return set;
}

const routes = await extractRoutes();
const type = `
export type Route = ExternalRoute | InternalRoute;

export type ExternalRoute = \`https://\${string}\`;

export type InternalRoute =
  | ${[...routes]
    .sort()
    .map((route) => `'${route}'`)
    .join('\n  | ')};
  `;

await Fs.writeFile(OUTPUT_PATH, type.trim());
