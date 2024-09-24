import { dirname, resolve, extname } from 'path';
import { fileURLToPath } from 'url';
import {
  readdir,
  readFile,
  stat,
  mkdir,
  writeFile,
  copyFile,
} from 'fs/promises';

import { indexCss, indexJs, indexHtml, deps } from './scaffold/utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const REACT_SITE_DIR = resolve(__dirname, '../../../sites/reactflow.dev');
const EXAMPLES_DIR = resolve(__dirname, REACT_SITE_DIR, 'src/pages/examples');
const codePathRegex = /codePath="(?<codePath>.+)"/gm;
const depsRegex = /dependencies={{(?<deps>.+)}}/gm;

const examples = await readdir(EXAMPLES_DIR);

// loop through all the example sites
for (const exampleCategory of examples) {
  const isDirectory = (
    await stat(resolve(EXAMPLES_DIR, exampleCategory))
  ).isDirectory();

  if (isDirectory) {
    const exampleFilesPath = resolve(EXAMPLES_DIR, exampleCategory);
    const exampleFiles = await readdir(exampleFilesPath);

    for (const exampleFile of exampleFiles) {
      const isMDX = extname(exampleFile) === '.mdx';
      const exampleSlug = exampleFile.split('.')[0];

      if (isMDX) {
        const newExamplePath = resolve(
          __dirname,
          `../../example-apps/react/examples/${exampleCategory}/${exampleSlug}`,
        );

        await adjustExampleSite();

        await createExample({
          pathName: newExamplePath,
          category: exampleCategory,
          mdxFile: exampleFile,
          slug: exampleSlug,
        });
      }
    }
  }
}

async function adjustExampleSite({ mdxPath, mdxContent, category, slug }) {
  const newContent = `<RemoteCodeViewer
  source={\`\$\{process.env.NEXT_PUBLIC_EXAMPLES_URL\}/examples/${category}/${slug}/source.json\`}
  preview={\`\$\{process.env.NEXT_PUBLIC_EXAMPLES_URL\}/examples/${category}/${slug}/index.html\`}
  framework="react"
/>`;

  await writeFile(mdxPath, mdxContent + newContent);
}

// this functions creates the new example based on the legacy one
async function createExample({ pathName, category, mdxFile, slug }) {
  await mkdir(pathName, { recursive: true });
  const mdxPath = resolve(EXAMPLES_DIR, category, mdxFile);
  const mdxContent = await readFile(mdxPath, 'utf-8');

  if (!mdxContent.includes('<RemoteCodeViewer')) {
    adjustExampleSite({ mdxPath, mdxContent, categor, slug });
  }

  // get the codePath from the mdx file
  const codePathResult = [...mdxContent.matchAll(codePathRegex)];
  const codePath = codePathResult[0]?.groups?.codePath;

  const depsResult = [...mdxContent.matchAll(depsRegex)];
  const dependencies = depsResult[0]?.groups?.deps;
  const depsString = dependencies?.split(':')?.[0]?.trim().replace(/'/g, '');

  if (!codePath) {
    console.log(`can't handle ${mdxFile} example`);
    return;
  }

  const legacyExampleDir = resolve(
    __dirname,
    REACT_SITE_DIR,
    `src/components/example-viewer/${codePath}`,
  );

  const legacyExampleFiles = await readdir(legacyExampleDir);
  const isTypescript = legacyExampleFiles.some((file) => file === 'index.tsx');

  const htmlContent = indexHtml({ framework: 'react', isTypescript });
  const indexJsContent = indexJs('react');
  const depsContent = deps({
    framework: 'react',
    deps: depsString ? [depsString] : [],
  });
  let cssContent = indexCss('react');

  await writeFile(resolve(pathName, 'index.html'), htmlContent);
  await writeFile(
    resolve(pathName, `index.${isTypescript ? 'tsx' : 'jsx'}`),
    indexJsContent,
  );
  await writeFile(resolve(pathName, 'dependencies.json'), depsContent);

  for (const file of legacyExampleFiles) {
    // if an example brings its own css, we need to add it to the existing one
    if (file.includes('.css')) {
      const css = await readFile(resolve(legacyExampleDir, file), 'utf-8');
      cssContent += css;
    } else if (file === 'index.tsx' || file === 'index.jsx') {
      const srcFile = resolve(legacyExampleDir, file);
      const destFile = resolve(pathName, `App.${isTypescript ? 'tsx' : 'jsx'}`);
      await copyFile(srcFile, destFile);
    } else {
      const srcFile = resolve(legacyExampleDir, file);
      const destFile = resolve(pathName, file);
      await copyFile(srcFile, destFile);
    }
  }

  await writeFile(resolve(pathName, 'index.css'), cssContent);
}
