// TEMPLATES AND UTILS ---------------------------------------------------------

export function indexHtml({ framework, isTypescript = true } = {}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Flow Example</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./index.${ext({
      framework,
      isTypescript,
    })}"></script>
  </body>
</html>
  `;
}

export function indexCss() {
  return `html,
body {
  margin: 0;
  font-family: sans-serif;
}

#app {
  width: 100vw;
  height: 100vh;
}

`;
}

export function indexJs(framework) {
  switch (framework.toLowerCase()) {
    case 'react':
      return `
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(<App />);
      `.trim();

    case 'svelte':
      return `
import App from './App.svelte';

import './index.css';

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

export function appJs(framework) {
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

import '@xyflow/react/dist/style.css';

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

  import '@xyflow/svelte/dist/style.css';

  const nodes = writable<Node[]>([]);
  const edges = writable<Edge[]>([]);
</script>

<SvelteFlow {nodes} {edges} fitView />
      `.trim();
  }
}

function ext({
  kind = 'script',
  framework = 'react',
  isTypescript = true,
} = {}) {
  switch (framework.toLowerCase()) {
    case 'react':
      return isTypescript ? 'tsx' : 'jsx';

    case 'svelte':
      return kind === 'app' ? 'svelte' : 'ts';

    default:
      throw new TypeError();
  }
}

export function deps({ framework, deps } = {}) {
  const _deps = deps ?? [];

  switch (framework.toLowerCase()) {
    case 'react':
      return JSON.stringify(
        ['@xyflow/react', 'react-dom', 'react', ..._deps],
        null,
        2,
      );

    case 'svelte':
      return JSON.stringify(['@xyflow/svelte', 'svelte', ..._deps], null, 2);
  }
}
