<script lang="ts">
  import {
    SvelteFlow,
    Background,
    type Node,
    type Edge,
    type OnBeforeDelete,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const onbeforedelete: OnBeforeDelete = async ({ nodes, edges }) => {
    // TODO
    return true;
  };
</script>

<div style="height:100vh;">
  <SvelteFlow bind:nodes bind:edges {onbeforedelete} fitView>
    <Background />
  </SvelteFlow>
</div>
