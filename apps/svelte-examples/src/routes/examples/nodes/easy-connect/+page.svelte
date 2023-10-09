<script lang="ts">
  import { ConnectionLineType, MarkerType, SvelteFlow } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

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

  const connectionLineStyle = 'stroke: black !important;';
</script>

<div style="height:100vh;">
  <SvelteFlow
    {nodes}
    {nodeTypes}
    {edges}
    {edgeTypes}
    {defaultEdgeOptions}
    on:connect={(e) => {
      console.log(e);
    }}
    connectionLineType={ConnectionLineType.Straight}
    {connectionLineStyle}
    fitView
  ></SvelteFlow>
</div>

<style>
</style>
