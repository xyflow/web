<script lang="ts">
  import {
    SvelteFlow,
    Background,
    type Edge,
    type Node,
    MiniMap,
  } from '@xyflow/svelte';

  import CustomNode from './CustomNode.svelte';
  import ConnectionLine from './ConnectionLine.svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeTypes = {
    custom: CustomNode,
  };

  let nodes = $state.raw<Node[]>([
    {
      id: 'connectionline-1',
      type: 'custom',
      data: { label: 'Node 1' },
      position: { x: 250, y: 5 },
    },
  ]);

  let edges = $state.raw<Edge[]>([]);
</script>

<SvelteFlow
  bind:nodes
  bind:edges
  {nodeTypes}
  fitView
  connectionLineComponent={ConnectionLine}
>
  <Background />
  <MiniMap />
</SvelteFlow>
