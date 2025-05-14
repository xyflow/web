'use client';

import { useCallback } from 'react';
import sdk, { Project, ProjectTemplate, OpenOptions } from '@stackblitz/sdk';

import { Button, Framework } from '@xyflow/xy-ui';
import { fetchFiles } from './fetchFiles';

type OpenInStackblitzProps = {
  framework: Framework;
  route: string;
};

type Files = {
  [path: string]: {
    code: string;
  };
};

export function OpenInStackblitz({ framework, route }: OpenInStackblitzProps) {
  const openInStackblitz = useCallback(async () => {
    try {
      const { files, dependencies } = await fetchFiles(route, framework);
      const { project, options } = prepare(framework, files, dependencies);

      sdk.openProject(project, options);
    } catch (e) {}
  }, [framework, route]);

  return (
    <Button
      onClick={openInStackblitz}
      size="sm"
      className="font-medium text-[10px] h-6 bg-gray-100 hover:bg-gray-200 text-gray-700"
    >
      Open in Stackblitz
    </Button>
  );
}

function prepare(
  framework: Framework,
  files: Files,
  dependencies: Record<string, string>,
): { project: Project; options: OpenOptions } {
  switch (framework) {
    case 'react': {
      const projectFiles = prepareReactProject(files, dependencies);
      const project = {
        title: 'ReactFlow example',
        template: 'node' as ProjectTemplate,
        files: projectFiles,
      };
      const options = { openFile: 'App.tsx' };

      return { project, options };
    }

    case 'svelte': {
      const projectFiles = prepareSvelteProject(files, dependencies);
      const project = {
        title: 'SvelteFlow example',
        template: 'node' as ProjectTemplate,
        files: projectFiles,
      };
      const options = { openFile: 'App.svelte' };

      return { project, options };
    }

    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }
}

function prepareReactProject(files: Files, dependencies: Record<string, string>) {
  return {
    ...Object.entries(files).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        return { ...acc, [key]: value };
      } else {
        return { ...acc, [key]: value.code };
      }
    }, {}),
    'package.json': JSON.stringify({
      name: 'reactflow-example',
      private: true,
      version: '1.0.0',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies,
      devDependencies: {
        '@vitejs/plugin-react': '^3.1.0',
        vite: '4.1.4',
        '@types/react': dependencies.react ?? '^18.0.0',
        '@types/react-dom': dependencies['react-dom'] ?? '^18.0.0',
        typescript: '^4.9.0',
      },
    }),
    'vite.config.js': `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n})`,
    'vite-env.d.ts': `/// <reference types="vite/client" />\n`,
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ESNext",
    "jsx": "react-jsx",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "useDefineForClassFields": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true
  },
  "include": ["./**/*.d.ts", "./**/*.{js,jsx,ts,tsx}"],
}`,
  };
}

function prepareSvelteProject(files: Files, dependencies: Record<string, string>) {
  return {
    ...Object.entries(files).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        return { ...acc, [key]: value };
      } else {
        return { ...acc, [key]: value.code };
      }
    }, {}),
    'package.json': JSON.stringify({
      name: 'svelteflow-example',
      private: true,
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies,
      devDependencies: {
        '@sveltejs/vite-plugin-svelte': '^5.0.3',
        '@tsconfig/svelte': '^5.0.4',
        svelte: '^5.28.6',
        'svelte-check': '^4.1.7',
        tslib: '^2.8.1',
        typescript: '^5.8.3',
        vite: '^6.3.5',
      },
    }),
    'vite.config.ts': `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
})`,
    'svelte.config.js': `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess(),
}`,
    'tsconfig.json': `{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true
  },
  "include": ["./**/*.d.ts", "src/**/*.{js,ts,svelte}"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
    'tsconfig.node.json': `{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node"
  },
  "include": ["vite.config.ts"]
}`,
  };
}
