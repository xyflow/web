<script lang="ts">
  import { SvelteFlow, Controls, MiniMap, type Node, type Edge } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import CustomNode from './CustomNode.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode,
  };
</script>

<SvelteFlow bind:nodes {nodeTypes} bind:edges fitView class="bg-teal-50">
  <MiniMap />
  <Controls />
</SvelteFlow>
