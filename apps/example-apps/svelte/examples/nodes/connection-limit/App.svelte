<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  import CustomNode from './CustomNode.svelte';
  import { initialNodes, initialEdges } from './nodes-and-edges';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode,
  };
</script>

<div style="height:100vh;">
  <SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
    <Background />
  </SvelteFlow>
</div>
