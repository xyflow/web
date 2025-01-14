<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import DownloadButton from './DownloadButton.svelte';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const defaultEdgeOptions = {
    animated: true,
    type: 'smoothstep',
  };
</script>

<div style="height:100vh;">
  <SvelteFlow bind:nodes bind:edges {defaultEdgeOptions} fitView>
    <DownloadButton />
    <Background />
  </SvelteFlow>
</div>
