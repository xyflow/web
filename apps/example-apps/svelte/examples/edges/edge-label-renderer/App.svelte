<script lang="ts">
  import {
    SvelteFlow,
    Background,
    type Node,
    type Edge,
    type EdgeTypes,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import CustomEdge from './CustomEdge.svelte';
  import CustomEdgeStartEnd from './CustomEdgeStartEnd.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
    'start-end': CustomEdgeStartEnd,
  };
</script>

<div style="height:100vh;">
  <SvelteFlow bind:nodes bind:edges {edgeTypes} fitView>
    <Background />
  </SvelteFlow>
</div>
