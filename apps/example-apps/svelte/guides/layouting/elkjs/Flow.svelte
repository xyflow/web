<script>
  import { SvelteFlow, Background, Panel, useSvelteFlow } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  import ELK from 'elkjs/lib/elk.bundled.js';
  import { initialNodes, initialEdges } from './nodes-edges.js';

  let nodes = $state.raw([...initialNodes]);
  let edges = $state.raw([...initialEdges]);
  let layouting = $state.raw(false);
  const elk = new ELK();

  const { fitView } = useSvelteFlow();

  async function getLayoutedElements(nodes, edges, options) {
    if (!elk) return { nodes, edges };

    // Convert the graph to the structure required by ELK
    const graph = {
      id: 'root',
      layoutOptions: options,
      children: nodes.map((node) => ({
        id: node.id,
        width: node.measured?.width ?? 150,
        height: node.measured?.height ?? 40,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      })),
    };

    // Calculate the layout using ELK
    const elkGraph = await elk.layout(graph);

    // Extract the positions from elkGraph
    const layoutedNodes = nodes.map((node) => {
      const elkNode = elkGraph.children.find((n) => n.id === node.id);

      if (elkNode) {
        return {
          ...node,
          position: {
            x: elkNode.x,
            y: elkNode.y,
          },
        };
      }

      return node;
    });

    return { nodes: layoutedNodes, edges };
  }

  async function onLayout(algorithm) {
    if (layouting) return;

    layouting = true;

    try {
      // Define layout options based on the selected algorithm
      let options = {};

      if (algorithm === 'layered') {
        options = {
          'elk.algorithm': 'layered',
          'elk.direction': 'DOWN',
          'elk.layered.spacing.nodeNodeBetweenLayers': '100',
          'elk.spacing.nodeNode': '80',
        };
      } else if (algorithm === 'force') {
        options = {
          'elk.algorithm': 'force',
          'elk.force.iterations': '300',
        };
      } else if (algorithm === 'radial') {
        options = {
          'elk.algorithm': 'radial',
        };
      } else if (algorithm === 'tree') {
        options = {
          'elk.algorithm': 'mrtree',
        };
      }

      const layoutedElements = await getLayoutedElements(nodes, edges, options);

      nodes = [...layoutedElements.nodes];
      edges = [...layoutedElements.edges];

      fitView();
    } catch (error) {
      console.error('Error during layout calculation:', error);
    } finally {
      layouting = false;
    }
  }
</script>

<SvelteFlow bind:nodes bind:edges fitView minZoom={0.01}>
  <Panel position="top-right">
    <div style="display: flex; gap: 5px;">
      <button disabled={layouting} onclick={() => onLayout('layered')}>
        layered layout
      </button>
      <button disabled={layouting} onclick={() => onLayout('force')}>
        force layout
      </button>
      <button disabled={layouting} onclick={() => onLayout('radial')}>
        radial layout
      </button>
      <button disabled={layouting} onclick={() => onLayout('tree')}> tree layout </button>
    </div>
  </Panel>
  <Background />
</SvelteFlow>
