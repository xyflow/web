<script>
  import { Background, SvelteFlow, useSvelteFlow } from '@xyflow/svelte';

  import { initialNodes, initialEdges } from './nodes-edges.js';
  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([...initialNodes]);
  let edges = $state.raw([...initialEdges]);

  const { fitView } = useSvelteFlow();

  function getLayoutedElements(nodes, edges) {
    return { nodes, edges };
  }

  function onLayout() {
    const layouted = getLayoutedElements(nodes, edges);

    nodes = [...layouted.nodes];
    edges = [...layouted.edges];

    fitView();
  }
</script>

<SvelteFlow bind:nodes bind:edges fitView colorMode="system" >
  <Background />
</SvelteFlow>
