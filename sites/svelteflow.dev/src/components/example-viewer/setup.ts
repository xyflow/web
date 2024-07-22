const setup = ({ dependencies = {}, tailwind = false } = {}) => {
  const baseFiles = {
    'README.md':
      "# Svelte + Vite\n\nThis template should help get you started developing with Svelte in Vite.\n\n## Recommended IDE Setup\n\n[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).\n\n## Need an official Svelte framework?\n\nCheck out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.\n\n## Technical considerations\n\n**Why use this over SvelteKit?**\n\n- It brings its own routing solution which might not be preferable for some users.\n- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.\n\nThis template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.\n\nShould you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.\n\n**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**\n\nSetting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.\n\n**Why include `.vscode/extensions.json`?**\n\nOther templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.\n\n**Why enable `checkJs` in the JS template?**\n\nIt is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.\n\n**Why is HMR not preserving my local component state?**\n\nHMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).\n\nIf you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.\n\n```js\n// store.js\n// An extremely simple external store\nimport { writable } from 'svelte/store'\nexport default writable(0)\n```\n",
    _gitignore:
      '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n',
    'index.html':
      '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite + Svelte</title>\n <style>\nhtml,body,#app {margin: 0; font-family: sans-serif;}</style>\n</head>\n  <body>\n    <div id="app"></div>\n    <script type="module" src="/src/main.js"></script>\n  </body>\n</html>\n',
    // 'src/app.css': '',
    'src/main.js':
      "import App from './example/App.svelte'\n\nconst app = new App({\n  target: document.getElementById('app'),\n})\n\nexport default app\n",
    'package.json': JSON.stringify({
      name: 'vite-svelte-starter',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        '@xyflow/svelte': `${process.env.SVELTE_FLOW_VERSION}`,
        ...dependencies,
      },
      devDependencies: {
        '@sveltejs/vite-plugin-svelte': '^2.4.4',
        svelte: '^4.1.2',
        vite: '^4.4.9',
      },
    }),
    'jsconfig.json':
      '{\n  "compilerOptions": {\n    "moduleResolution": "bundler",\n    "target": "ESNext",\n    "module": "ESNext",\n    /**\n     * svelte-preprocess cannot figure out whether you have\n     * a value or a type, so tell TypeScript to enforce using\n     * `import type` instead of `import` for Types.\n     */\n    "verbatimModuleSyntax": true,\n    "isolatedModules": true,\n    "resolveJsonModule": true,\n    /**\n     * To have warnings / errors of the Svelte compiler at the\n     * correct position, enable source maps by default.\n     */\n    "sourceMap": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    /**\n     * Typecheck JS in `.svelte` and `.js` files by default.\n     * Disable this if you\'d like to use dynamic types.\n     */\n    "checkJs": true\n  },\n  /**\n   * Use global.d.ts instead of compilerOptions.types\n   * to avoid limiting type declarations.\n   */\n  "include": ["src/**/*.d.ts", "src/**/*.js", "src/**/*.svelte"]\n}\n',
    'vite.config.js':
      "import { defineConfig } from 'vite'\nimport { svelte } from '@sveltejs/vite-plugin-svelte'\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [svelte()],\n})\n",
    'public/vite.svg':
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>',
    'svelte.config.js':
      "import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'\n\nexport default {\n  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess\n  // for more information about preprocessors\n  preprocess: vitePreprocess(),\n}\n",
    'src/vite-env.d.ts':
      '/// <reference types="svelte" />\n/// <reference types="vite/client" />\n',
    '.vscode/extensions.json':
      '{\n  "recommendations": ["svelte.svelte-vscode"]\n}\n',
  };
  if (tailwind) {
    return {
      ...baseFiles,
      'postcss.config.js':
        'export default {plugins:{tailwindcss: {},autoprefixer: {}}};',
      'tailwind.config.js':
        "/** @type {import('tailwindcss').Config} */\r\nexport default {\r\n  // Needs to be important to override the default styles\r\n  important: true,\r\n  content: ['./src/**/*.{html,js,svelte,ts}'],\r\n  theme: {\r\n    extend: {}\r\n  },\r\n  plugins: []\r\n};",
    };
  } else {
    return baseFiles;
  }
};

export default setup;
