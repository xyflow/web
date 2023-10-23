<script lang="ts">
  import { writable } from 'svelte/store';
  import ELK from 'elkjs/lib/elk.bundled.js';
  import {
    SvelteFlow,
    Background,
    Position,
    ConnectionLineType,
    Panel,
    useSvelteFlow,
    type Node,
    type Edge
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import { onMount } from 'svelte';

  const nodes = writable<Node[]>([]);
  const edges = writable<Edge[]>([]);

  const { fitView } = useSvelteFlow();

  const elk = new ELK();

  // Elk has a *huge* amount of options to configure. To see everything you can
  // tweak check out:
  //
  // - https://www.eclipse.org/elk/reference/algorithms.html
  // - https://www.eclipse.org/elk/reference/options.html
  const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80'
  };

  function getLayoutedElements(nodes: Node[], edges: Edge[], options = {}) {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph = {
      id: 'root',
      layoutOptions: options,
      children: nodes.map((node) => ({
        ...node,
        // Adjust the target and source handle positions based on the layout
        // direction.
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,

        // Hardcode a width and height for elk to use when layouting.
        width: 150,
        height: 50
      })),
      edges: edges
    };

    return elk
      .layout(graph)
      .then((layoutedGraph) => ({
        nodes: layoutedGraph.children.map((node) => ({
          ...node,
          // React Flow expects a position property on the node instead of `x`
          // and `y` fields.
          position: { x: node.x, y: node.y }
        })),

        edges: layoutedGraph.edges
      }))
      .catch(console.error);
  }

  function onLayout(direction: string, useInitialNodes = false) {
    const opts = { 'elk.direction': direction, ...elkOptions };
    const ns = useInitialNodes ? initialNodes : $nodes;
    const es = useInitialNodes ? initialEdges : $edges;

    getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
      $nodes = layoutedNodes;
      $edges = layoutedEdges;

      fitView();

      window.requestAnimationFrame(() => fitView());
    });
  }

  onMount(() => {
    onLayout('DOWN', true);
  });
</script>

<div style="height:100vh;">
  <SvelteFlow
    {nodes}
    {edges}
    fitView
    connectionLineType={ConnectionLineType.SmoothStep}
    defaultEdgeOptions={{ type: 'smoothstep', animated: true }}
  >
    <Panel position="top-right">
      <button on:click={() => onLayout('DOWN')}>vertical layout</button>
      <button on:click={() => onLayout('RIGHT')}>horizontal layout</button>
    </Panel>
    <Background />
  </SvelteFlow>
</div>
