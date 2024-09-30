<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import DownloadButton from './DownloadButton.svelte';

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);

  const defaultEdgeOptions = {
    animated: true,
    type: 'smoothstep'
  };
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {defaultEdgeOptions} fitView>
    <DownloadButton />
    <Background />
  </SvelteFlow>
</div>
