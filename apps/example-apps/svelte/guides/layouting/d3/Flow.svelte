<script>
  import { SvelteFlow, Background, Panel, useSvelteFlow } from '@xyflow/svelte';
  import { stratify, tree } from 'd3-hierarchy';
  import { initialNodes, initialEdges } from './nodes-edges.js';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([...initialNodes]);
  let edges = $state.raw([...initialEdges]);

  const { fitView } = useSvelteFlow();

  const g = tree();

  const getLayoutedElements = (nodes, edges, options) => {
    if (nodes.length === 0) return { nodes, edges };

    const { width, height } = document
      .querySelector(`[data-id="${nodes[0].id}"]`)
      .getBoundingClientRect();
    const hierarchy = stratify()
      .id((node) => node.id)
      .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
    const root = hierarchy(nodes);
    const layout = g.nodeSize([width * 2, height * 2])(root);

    return {
      nodes: layout
        .descendants()
        .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
      edges,
    };
  };

  function onLayout() {
    const layouted = getLayoutedElements(nodes, edges);

    nodes = [...layouted.nodes];
    edges = [...layouted.edges];

    fitView();
  }
</script>

<SvelteFlow bind:nodes bind:edges fitView>
  <Panel position="top-right">
    <button onclick={onLayout}>tree layout</button>
  </Panel>
  <Background />
</SvelteFlow>
