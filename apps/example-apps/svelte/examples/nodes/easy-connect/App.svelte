<script lang="ts">
  import {
    ConnectionLineType,
    MarkerType,
    SvelteFlow,
    Background,
    type Node,
    type Edge,
  } from '@xyflow/svelte';

  import CustomNode from './CustomNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import FloatingEdge from './FloatingEdge.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode,
  };

  const edgeTypes = {
    floating: FloatingEdge,
  };

  const defaultEdgeOptions = {
    type: 'floating',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'black',
    },
  };
</script>

<SvelteFlow
  bind:nodes
  {nodeTypes}
  bind:edges
  {edgeTypes}
  {defaultEdgeOptions}
  connectionLineType={ConnectionLineType.Straight}
  fitView
>
  <Background />
</SvelteFlow>
