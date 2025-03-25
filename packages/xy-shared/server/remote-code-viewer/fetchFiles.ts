import { Framework } from '@xyflow/xy-ui';

export async function fetchFiles(route: string, framework: Framework) {
  const url = `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${framework}/${route}/source.json`;

  const res = await fetch(url);
  const json = await res.json();

  if (!('files' in json) || !('dependencies' in json)) {
    throw new Error('Invalid source.json format');
  }
  const files = json.files;

  // this is a workaround for the examples that are using jsx
  // if we don't do this, Sandpack will generate a default App.tsx file
  if (framework === 'react' && files['App.jsx']) {
    files['App.tsx'] = files['App.jsx'];
    delete files['App.jsx'];
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

  return { files, dependencies: json.dependencies };
}
