import * as Fs from 'node:fs/promises';
import * as Path from 'node:path';
import * as Process from 'node:process';

const [framework, route] = Process.argv.slice(2);

if (!framework || !route) {
  console.log(`
The scaffold script helps you quickly put together a new example for either
reactflow.dev or svelteflow.dev by copying over the boilerplate. All arguments
are *required*.

USAGE:

  pnpm scaffold <FRAMEWORK> <ROUTE>

EXAMPLES:

  pnpm scaffold react blog/web-audio/demo

  pnpm scaffold svelte guides/getting-started

ARGUMENTS:

  FRAMEWORK   'react' | 'svelte'

              The framework the example will be written in. This affects where
              the generated files are placed in conjuction with the ROUTE
              argument.

  ROUTE       string

              The route fragment the example app will be served at when combined
              with the FRAMEWORK argument. For example, calling the script as
              \`pnpm scaffold react examples/nodes/custom-node\` will scaffold
              the example and make it accessible at
              '/react/examples/nodes/custom-node/index.html'.
  `);

  Process.exit(1);
} else {
  main();
}

// MAIN ------------------------------------------------------------------------

async function main() {
  const dir = Path.join(Process.cwd(), framework, route);

  console.log(`🚧 Scaffolding a new example at ${dir}`);

  await Fs.mkdir(dir, { recursive: true });
  await Fs.writeFile(Path.join(dir, 'index.html'), indexHtml());
  await Fs.writeFile(Path.join(dir, 'index.css'), indexCss());
  await Fs.writeFile(Path.join(dir, `index.${ext()}`), indexJs());
  await Fs.writeFile(Path.join(dir, `App.${ext('app')}`), appJs());
  await Fs.writeFile(Path.join(dir, 'dependencies.json'), deps());
}

// TEMPLATES AND UTILS ---------------------------------------------------------

function indexHtml() {
  return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Flow Example</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./index.${ext()}"></script>
  </body>
</html>
  `;
}

function indexCss() {
  return `
html,
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}
  `;
}

function indexJs() {
  switch (framework.toLowerCase()) {
    case 'react':
      return `
import './index.css';
import '@xyflow/react/dist/style.css';

import { App } from './App';
import { createRoot } from 'react-dom/client';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(<App />);
      `.trim();

    case 'svelte':
      return `
import './index.css';
import '@xyflow/svelte/dist/style.css';

import App from './App.svelte';

const app = new App({
	target: document.querySelector('#app'),
	props: {
		name: 'world'
	}
});
      `.trim();

    default:
      throw new TypeError('');
  }
}

function appJs() {
  switch (framework.toLowerCase()) {
    case 'react':
      return `
import React, { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
  );
}

export function App() {
  return <Flow />;
}
      `.trim();

    case 'svelte':
      return `
<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, type Node, type Edge } from '@xyflow/svelte';

  const nodes = writable<Node[]>([]);
  const edges = writable<Edge[]>([]);
</script>

<SvelteFlow {nodes} {edges} fitView />
      `.trim();
  }
}

function ext(kind = 'script') {
  switch (framework.toLowerCase()) {
    case 'react':
      return 'tsx';

    case 'svelte':
      return kind === 'app' ? 'svelte' : 'ts';

    default:
      throw new TypeError();
  }
}

function deps() {
  switch (framework.toLowerCase()) {
    case 'react':
      return JSON.stringify(['@xyflow/react', 'react-dom', 'react'], null, 2);

    case 'svelte':
      return JSON.stringify(['@xyflow/svelte', 'svelte'], null, 2);
  }
}
