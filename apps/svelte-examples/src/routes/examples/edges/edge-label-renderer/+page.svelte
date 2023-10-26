<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Background,
    ConnectionMode,
    type Node,
    type Edge,
    type EdgeTypes
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import CustomEdge from './CustomEdge.svelte';
  import CustomEdgeStartEnd from './CustomEdgeStartEnd.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
    'start-end': CustomEdgeStartEnd
  };
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {edgeTypes} fitView>
    <Background />
  </SvelteFlow>
</div>
