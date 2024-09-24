import { SandpackFile } from '@codesandbox/sandpack-react/types';
import sdk from '@stackblitz/sdk';
import { Button, Framework } from '@xyflow/xy-ui';
import { useCallback } from 'react';

type OpenInStackblitzProps = {
  files: Record<string, string | SandpackFile>;
  dependencies: Record<string, string>;
  framework: Framework;
};

export function OpenInStackblitz({
  files,
  dependencies,
  framework,
}: OpenInStackblitzProps) {
  const openInStackblitz = useCallback(() => {
    const { project, options } = prepare(framework, files, dependencies);

    sdk.openProject(project, options);
  }, [framework, files, dependencies]);

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
  files: Record<string, string | SandpackFile>,
  dependencies: Record<string, string>,
) {
  switch (framework) {
    case 'react': {
      const project = prepareReactProject(files, dependencies);
      const options = { openFile: 'App.tsx' };

      return { project, options };
    }

    case 'svelte': {
      const project = prepareSvelteProject(files, dependencies);
      const options = { openFile: 'App.svelte' };

      return { project, options };
    }

    default:
      throw new Error(`Unsupported framework: ${framework}`);
  }
}

function prepareReactProject(
  files: Record<string, string | SandpackFile>,
  dependencies: Record<string, string>,
) {
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
  };
}

function prepareSvelteProject(
  files: Record<string, string | SandpackFile>,
  dependencies: Record<string, string>,
) {
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
        '@sveltejs/vite-plugin-svelte': '^2.4.0',
        svelte: '^3.58.0',
        'svelte-check': '^3.3.0',
        tslib: '^2.5.0',
        typescript: '^5.0.0',
        vite: '^4.3.0',
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
  "include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
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
