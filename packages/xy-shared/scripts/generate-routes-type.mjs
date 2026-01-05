import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';

// Get the current working directory (where the script is called from, not where it lives)
// eslint-disable-next-line no-undef
const cwd = process.cwd();

const OUTPUT_PATH = Path.resolve(cwd, 'src/utils/routes.ts');
const ROUTES_PATH = Path.resolve(cwd, 'src/content');

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

console.log(`✅ Generated ${routes.size} routes in ${OUTPUT_PATH}`);
