<script lang="ts">
  import { SvelteFlow, Background, Controls, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import DownloadButton from './DownloadButton.svelte';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import CustomNode from './CustomNode.svelte';
  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    custom: CustomNode,
  };

  const defaultEdgeOptions = {
    animated: true,
    type: 'smoothstep',
  };
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} {defaultEdgeOptions} fitView>
  <Controls />
  <DownloadButton />
  <Background />
</SvelteFlow>
