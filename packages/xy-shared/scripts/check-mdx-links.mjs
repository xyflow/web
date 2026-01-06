import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';

import { extractRoutes } from './generate-routes-type.mjs';

// Get the current working directory (where the script is called from, not where it lives)
// eslint-disable-next-line no-undef
const cwd = process.cwd();
const PAGES_PATH = Path.resolve(cwd, 'src/content');

const routes = await extractRoutes();

async function verifyPage(path) {
  const dir = `${PAGES_PATH}/${path}`;

  for (const dirent of await Fs.readdir(dir, { withFileTypes: true })) {
    if (dirent.name.endsWith('.mdx')) {
      const page = await Fs.readFile(`${dir}/${dirent.name}`, 'utf8');
      const links = Array.from(
        page.matchAll(/\[.*?\]\((.*?)(#.*?)?\)/g),
        (match) => match[1],
      );
      const errors = [];

      for (const link of links) {
        if (link.startsWith('http')) {
          continue;
        }

        if (link.startsWith('.')) {
          errors.push(`  Relative links are not allowed "${link}"`);
        }

        if (link.startsWith('/') && !routes.has(link)) {
          errors.push(`  Missing route "${link}"`);
        }
      }

      if (errors.length) {
        console.error('Invalid links found in', `${path}/${dirent.name}`);
        for (const error of errors) {
          console.error(error);
        }
        console.error();
      }
    } else if (dirent.isDirectory()) {
      await verifyPage(`${path}/${dirent.name}`);
    }
  }
}

await verifyPage('');

console.log('✅ MDX link check complete');
