<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    type IsValidConnection,
    Position,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeDefaults = {
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };

  let nodes = $state.raw([
    {
      id: '0',
      position: { x: 0, y: 150 },
      data: { label: 'only connectable with B' },
      ...nodeDefaults,
    },
    {
      id: 'A',
      position: { x: 250, y: 0 },
      data: { label: 'A' },
      ...nodeDefaults,
    },
    {
      id: 'B',
      position: { x: 250, y: 150 },
      data: { label: 'B' },
      ...nodeDefaults,
    },
    {
      id: 'C',
      position: { x: 250, y: 300 },
      data: { label: 'C' },
      ...nodeDefaults,
    },
  ]);

  let edges = $state.raw([]);

  const isValidConnection: IsValidConnection = (connection) =>
    connection.target === 'B';
</script>

<main>
  <SvelteFlow
    bind:nodes
    bind:edges
    fitView
    minZoom={0.1}
    maxZoom={2.5}
    {isValidConnection}
  >
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
  </SvelteFlow>
</main>

<style>
  main {
    height: 100vh;
  }

  :global(.svelte-flow .svelte-flow__node .svelte-flow__handle) {
    width: 8px;
    height: 8px;
  }

  :global(.svelte-flow .svelte-flow__handle.connectingto) {
    background: #ff6060;
  }

  :global(.svelte-flow .svelte-flow__handle.valid) {
    background: #55dd99;
  }
</style>
