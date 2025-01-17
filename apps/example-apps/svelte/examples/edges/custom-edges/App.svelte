<script lang="ts">
  import {
    SvelteFlow,
    Background,
    ConnectionMode,
    Controls,
    type Node,
    type Edge,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import ButtonEdge from './ButtonEdge.svelte';
  import BiDirectionalEdge from './BiDirectionalEdge.svelte';
  import BiDirectionalNode from './BiDirectionalNode.svelte';
  import SelfConnectingEdge from './SelfConnectingEdge.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    bidirectional: BiDirectionalNode,
  };

  const edgeTypes = {
    buttonedge: ButtonEdge,
    bidirectional: BiDirectionalEdge,
    selfconnecting: SelfConnectingEdge,
  };
</script>

<SvelteFlow
  bind:nodes
  {nodeTypes}
  bind:edges
  {edgeTypes}
  connectionMode={ConnectionMode.Loose}
  fitView
>
  <Controls />
  <Background />
</SvelteFlow>
