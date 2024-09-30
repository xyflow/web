<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    ConnectionLineType,
    MarkerType,
    SvelteFlow,
    Background,
    type Node,
    type Edge
  } from '@xyflow/svelte';

  import CustomNode from './CustomNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import FloatingEdge from './FloatingEdge.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode
  };

  const edgeTypes = {
    floating: FloatingEdge
  };

  const defaultEdgeOptions = {
    style: 'stroke-width: 3; stroke: black;',
    type: 'floating',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'black'
    }
  };

  const connectionLineStyle = 'stroke: black; stroke-width: 3;';
</script>

<div style="height:100vh;">
  <SvelteFlow
    {nodes}
    {nodeTypes}
    {edges}
    {edgeTypes}
    {defaultEdgeOptions}
    connectionLineType={ConnectionLineType.Straight}
    {connectionLineStyle}
    fitView
  >
    <Background />
  </SvelteFlow>
</div>
