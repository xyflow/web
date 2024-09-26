import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readdir, readFile, mkdir, writeFile, copyFile, cp } from 'fs/promises';

import { indexCss, indexJs, indexHtml, deps } from './scaffold/utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const toKebabCase = (str) =>
  str.replace(
    /[A-Z\d]+(?![a-z])|[A-Z\d]/g,
    ($, ofs) => (ofs ? '-' : '') + $.toLowerCase(),
  );

const REACT_SITE_DIR = resolve(__dirname, '../../../sites/reactflow.dev');
const TUTORIAL_DIR = resolve(
  __dirname,
  REACT_SITE_DIR,
  'src/components/example-viewer/blog-flows/webaudio',
);

const examples = await readdir(TUTORIAL_DIR);

// loop through all the example sites
for (const exampleFolder of examples) {
  await createExample({
    exampleFolder,
  });
}

// this functions creates the new example based on the legacy one
async function createExample({ exampleFolder }) {
  const exampleFilesPath = resolve(TUTORIAL_DIR, exampleFolder);
  const exampleFiles = await readdir(exampleFilesPath);
  const exampleSlug = toKebabCase(exampleFolder);

  const newExamplePath = resolve(
    __dirname,
    `../../example-apps/react/tutorials/webaudio/${exampleSlug}`,
  );

  await mkdir(newExamplePath, { recursive: true });

  const isTypescript = exampleFiles.some((file) => file === 'index.tsx');

  const htmlContent = indexHtml({ framework: 'react', isTypescript });
  const indexJsContent = indexJs('react');
  const depsContent = deps({
    framework: 'react',
    deps: [],
  });
  let cssContent = indexCss();

  await writeFile(resolve(newExamplePath, 'index.html'), htmlContent);
  await writeFile(
    resolve(newExamplePath, `index.${isTypescript ? 'tsx' : 'jsx'}`),
    indexJsContent,
  );
  await writeFile(resolve(newExamplePath, 'dependencies.json'), depsContent);

  for (const file of exampleFiles) {
    // if an example brings its own css, we need to add it to the existing one
    if (file.includes('.css')) {
      const css = await readFile(resolve(exampleFilesPath, file), 'utf-8');
      cssContent += css;
    } else if (
      file === 'index.tsx' ||
      file === 'index.jsx' ||
      file === 'index.js' ||
      file === 'index.ts'
    ) {
      const srcFile = resolve(exampleFilesPath, file);
      const destFile = resolve(
        newExamplePath,
        `App.${isTypescript ? 'tsx' : 'jsx'}`,
      );
      await copyFile(srcFile, destFile);
    } else {
      const srcFile = resolve(exampleFilesPath, file);
      const destFile = resolve(newExamplePath, file);
      await cp(srcFile, destFile, { recursive: true });
    }
  }

  await writeFile(resolve(newExamplePath, 'index.css'), cssContent);
}
