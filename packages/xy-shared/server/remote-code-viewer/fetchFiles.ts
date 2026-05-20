import { Framework } from '../../types';

export async function fetchFiles(route: string, framework: Framework) {
  const url = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${framework}/${route}/source.json`;

  const res = await fetch(url);
  const json = await res.json();

  if (!('files' in json) || !('dependencies' in json)) {
    throw new Error('Invalid source.json format');
  }
  const files = json.files;
  const devDependencies: Record<string, string> = json.devDependencies ?? {};

  // this is a workaround for the examples that are using jsx
  // if we don't do this, Sandpack will generate a default App.tsx file
  if (framework === 'react' && files['App.jsx']) {
    files['App.tsx'] = files['App.jsx'];
    delete files['App.jsx'];
  }

  if (framework === 'react') {
    for (const file of Object.keys(files)) {
      if (file === 'index.html') {
        files[file] = files[file]
          ?.replace('./index.tsx', './src/main.tsx')
          .replace('./index.jsx', './src/main.jsx')
          .replace('./index.ts', './src/main.ts')
          .replace('./index.js', './src/main.js');
        continue;
      }

      if (
        file === 'index.tsx' ||
        file === 'index.jsx' ||
        file === 'index.ts' ||
        file === 'index.js'
      ) {
        const extension = file.split('.').pop();
        files[`src/main.${extension}`] = files[file];
      } else {
        files[`src/${file}`] = files[file];
      }

      delete files[file];
    }
  } else if (framework === 'svelte') {
    for (const file of Object.keys(files)) {
      if (file === 'index.html') {
        files[file] = files[file]?.replace('./index.ts', './src/main.ts');
        continue;
      }

      if (file === 'index.ts') {
        files['src/main.ts'] = files[file];
      } else {
        files[`src/${file}`] = files[file];
      }

      delete files[file];
    }
  }

  return { files, dependencies: json.dependencies, devDependencies };
}
