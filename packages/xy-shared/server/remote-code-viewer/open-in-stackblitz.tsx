'use client';

import sdk, { OpenOptions, Project, ProjectTemplate } from '@stackblitz/sdk';
import { useCallback } from 'react';

import { Framework, IconButton } from '@xyflow/xy-ui';
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
    <IconButton
      title="Open in Stackblitz"
      onClick={openInStackblitz}
      icon={
        <svg
          className="size-4 fill-slate-700 stroke-slate-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 56 78"
        >
          <path d="M23.4273 48.2853C23.7931 47.5845 23.0614 46.8837 22.3298 46.8837H1.11228C0.0148224 46.8837 -0.350997 45.8326 0.380642 45.1318L40.9866 0.282084C41.7182 -0.418693 43.1815 0.282084 42.8157 1.33325L32.9386 30.0651C32.5727 30.7659 32.9386 31.4666 33.6702 31.4666H54.8877C55.9852 31.4666 56.351 32.5178 55.6194 33.2186L15.0134 77.7179C14.2818 78.4187 12.8185 77.7179 13.1843 76.6667L23.4273 48.2853Z" />
        </svg>
      }
    />
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
  const hasTailwind4 = Object.entries(dependencies).some(
    ([dependency, version]) =>
      dependency.includes('tailwindcss') && version.startsWith('^4.'),
  );

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
      dependencies: {
        ...dependencies,
        // If tailwindcss is present and is version 4, add @tailwindcss/vite
        ...(hasTailwind4 ? { '@tailwindcss/vite': dependencies['tailwindcss'] } : {}),
      },
      devDependencies: {
        '@vitejs/plugin-react': '^3.1.0',
        vite: '4.1.4',
        '@types/react': dependencies.react ?? '^18.0.0',
        '@types/react-dom': dependencies['react-dom'] ?? '^18.0.0',
        typescript: '^4.9.0',
      },
    }),
    'vite.config.js': `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n${hasTailwind4 ? 'import tailwindcss from "@tailwindcss/vite"' : ''}\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react(), ${hasTailwind4 ? 'tailwindcss()' : ''}],\n})`,
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
