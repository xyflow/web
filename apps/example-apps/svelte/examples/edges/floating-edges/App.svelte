<script lang="ts">
  import {
    SvelteFlow,
    Background,
    ConnectionMode,
    type Node,
    type Edge,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import CustomNode from './CustomNode.svelte';
  import SimpleFloatingEdge from './SimpleFloatingEdge.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode,
  };

  const edgeTypes = {
    floating: SimpleFloatingEdge,
  };
</script>

<SvelteFlow
  bind:nodes
  {nodeTypes}
  bind:edges
  {edgeTypes}
  fitView
  connectionMode={ConnectionMode.Loose}
>
  <Background />
</SvelteFlow>
