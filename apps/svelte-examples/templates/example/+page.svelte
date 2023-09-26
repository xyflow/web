<script lang="ts">
  import { SvelteFlow } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} fitView></SvelteFlow>
</div>

<style>
  :global(.svelte-flow__edge-path) {
    stroke: #333;
    stroke-width: 2;
  }

  :global(.temp .svelte-flow__edge-path) {
    stroke: #bbb;
    stroke-dasharray: 5 5;
  }

  :global(.svelte-flow__node) {
    border-radius: 100%;
    background-color: #fff;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
