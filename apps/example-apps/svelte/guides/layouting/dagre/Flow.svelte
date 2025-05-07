<script>
  import { SvelteFlow, Background, Panel, useStore } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import Dagre from '@dagrejs/dagre';
  import { initialNodes, initialEdges } from './nodes-edges.js';

  let nodes = $state.raw([...initialNodes]);
  let edges = $state.raw([...initialEdges]);

  const { fitView } = $derived(useStore());

  function getLayoutedElements(nodes, edges, options) {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
      g.setNode(node.id, {
        ...node,
        width: node.measured?.width ?? 0,
        height: node.measured?.height ?? 0,
      }),
    );

    Dagre.layout(g);

    return {
      nodes: nodes.map((node) => {
        const position = g.node(node.id);
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the Svelte Flow node anchor point (top left).
        const x = position.x - (node.measured?.width ?? 0) / 2;
        const y = position.y - (node.measured?.height ?? 0) / 2;

        return {
          ...node,
          position: { x, y },
          sourcePosition: options.direction === 'LR' ? 'right' : 'bottom',
          targetPosition: options.direction === 'LR' ? 'left' : 'top',
        };
      }),
      edges,
    };
  }

  function onLayout(direction) {
    const layouted = getLayoutedElements(nodes, edges, { direction });

    nodes = [...layouted.nodes];
    edges = [...layouted.edges];

    setTimeout(() => {
      fitView();
    }, 0);
  }
</script>

<SvelteFlow bind:nodes bind:edges fitView>
  <Panel position="top-right">
    <button onclick={() => onLayout('TB')}>vertical layout</button>
    <button onclick={() => onLayout('LR')}>horizontal layout</button>
  </Panel>
  <Background />
</SvelteFlow>
