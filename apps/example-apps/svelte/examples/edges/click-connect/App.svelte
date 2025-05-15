<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge, Panel } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import AnnotationNode from './AnnotationNode.svelte';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    annotation: AnnotationNode,
  };
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView>
  <Background />
</SvelteFlow>
