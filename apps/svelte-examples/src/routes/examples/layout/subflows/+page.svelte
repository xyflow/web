<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    type NodeTypes,
    type Node,
    type Edge
  } from '@xyflow/svelte';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import '@xyflow/svelte/dist/style.css';

  const nodes = writable<Node[]>(initialNodes);

  const edges = writable<Edge[]>(initialEdges);
</script>

<main>
  <SvelteFlow {nodes} {edges} fitView minZoom={0.1} maxZoom={2.5}>
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>
</main>

<style>
  main {
    height: 100vh;
  }

  :global(.svelte-flow .svelte-flow__node.parent) {
    background-color: rgba(220, 220, 255, 0.4);
  }
</style>
