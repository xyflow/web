<script lang="ts">
  import '@xyflow/svelte/dist/style.css';
  import { SvelteFlow, Background } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import CustomNode from './CustomNode.svelte';
  import { initialNodes, initialEdges } from './nodes-and-edges';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode
  };
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {nodeTypes} fitView>
    <Background />
  </SvelteFlow>
</div>

<style>
</style>
