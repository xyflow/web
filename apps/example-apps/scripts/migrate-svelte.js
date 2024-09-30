import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import {
  readdir,
  readFile,
  mkdir,
  writeFile,
  copyFile,
  stat,
} from 'fs/promises';

import { indexCss, indexJs, indexHtml, deps } from './scaffold/utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const toKebabCase = (str) =>
  str.replace(
    /[A-Z\d]+(?![a-z])|[A-Z\d]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
  );

const EXAMPLES_DIR = resolve(
  __dirname,
  '../../svelte-examples/src/routes/guides',
);

const exampleCategories = await readdir(EXAMPLES_DIR);

// loop through all the example sites
for (const exampleCategory of exampleCategories) {
  const isDirectory = (
    await stat(resolve(EXAMPLES_DIR, exampleCategory))
  ).isDirectory();

  if (isDirectory) {
    const examplesPath = resolve(EXAMPLES_DIR, exampleCategory);
    const examples = await readdir(examplesPath);

    for (const exampleFolder of examples) {
      await createExample({
        exampleFolder,
        exampleCategory,
      });
    }
  }
}

// this functions creates the new example based on the legacy one
async function createExample({ exampleFolder, exampleCategory }) {
  const exampleFilesPath = resolve(
    EXAMPLES_DIR,
    exampleCategory,
    exampleFolder,
  );
  const exampleFiles = await readdir(exampleFilesPath);
  const exampleSlug = toKebabCase(exampleFolder);

  const newExamplePath = resolve(
    __dirname,
    `../../example-apps/svelte/guides/${exampleCategory}/${exampleSlug}`,
  );

  await mkdir(newExamplePath, { recursive: true });

  const htmlContent = indexHtml({ framework: 'svelte', isTypescript: true });
  const indexJsContent = indexJs('svelte');
  const depsContent = deps({
    framework: 'svelte',
    deps: [],
  });
  let cssContent = indexCss();

  await writeFile(resolve(newExamplePath, 'index.html'), htmlContent);
  await writeFile(resolve(newExamplePath, 'index.ts'), indexJsContent);
  await writeFile(resolve(newExamplePath, 'dependencies.json'), depsContent);

  for (const file of exampleFiles) {
    // if an example brings its own css, we need to add it to the existing one
    if (file === '+server.ts') {
      // do nothing
    } else if (file.includes('.css')) {
      const css = await readFile(resolve(exampleFilesPath, file), 'utf-8');
      cssContent += css;
    } else if (file === '+page.svelte') {
      const srcFile = resolve(exampleFilesPath, file);
      const destFile = resolve(newExamplePath, 'App.svelte');
      await copyFile(srcFile, destFile);
    } else {
      const srcFile = resolve(exampleFilesPath, file);
      const destFile = resolve(newExamplePath, file);
      await copyFile(srcFile, destFile);
    }
  }

  await writeFile(resolve(newExamplePath, 'index.css'), cssContent);
}
