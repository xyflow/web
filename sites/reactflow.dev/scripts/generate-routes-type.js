const Fs = require('node:fs/promises');
const Path = require('node:path');

const OUTPUT_PATH = Path.resolve(__dirname, '../src/utils/routes.ts');
const ROUTES_PATH = Path.resolve(__dirname, '../src/pages');

main();

async function extractRoutes(path = '/', set = new Set()) {
  const dir = `${ROUTES_PATH}/${path}`;

  for (const dirent of await Fs.readdir(dir, { withFileTypes: true })) {
    if (dirent.name === '_meta.json') continue;
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

async function main() {
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
}
