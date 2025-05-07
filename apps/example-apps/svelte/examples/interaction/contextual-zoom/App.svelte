<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import ZoomNode from './ZoomNode.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    zoom: ZoomNode,
  };
</script>

<SvelteFlow bind:nodes {nodeTypes} bind:edges fitView>
  <Background />
</SvelteFlow>
