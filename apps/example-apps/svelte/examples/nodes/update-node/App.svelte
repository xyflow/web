<script lang="ts">
  import { SvelteFlow, Background, type Edge, type Node, Panel } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: Node[] = [
    { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  ];

  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw(initialEdges);

  let nodeName = $state('Node 1');
  let nodeBg = $state('#F58A6A');
  let nodeHidden = $state(false);

  function updateNode() {
    nodes = nodes.map((node) => {
      if (node.id === '1') {
        return {
          ...node,
          data: {
            ...node.data,
            label: nodeName,
          },
          style: `background: ${nodeBg}`,
          hidden: nodeHidden,
        };
      }
      return node;
    });
    edges = edges.map((edge) => {
      if (edge.id === 'e1-2') {
        return {
          ...edge,
          hidden: nodeHidden,
        };
      }
      return edge;
    });
  }

  updateNode();

  function updateNodeName(event) {
    nodeName = event.target.value;
    updateNode();
  }

  function updateNodeBg(event) {
    nodeBg = event.target.value;
    updateNode();
  }

  function updateNodeHidden(event) {
    nodeHidden = event.target.checked;
    updateNode();
  }
</script>

<SvelteFlow bind:nodes bind:edges fitView maxZoom={2}>
  <Panel position="top-left">
    <span>label:</span>
    <input value={nodeName} oninput={updateNodeName} />

    <span>background:</span>
    <input value={nodeBg} oninput={updateNodeBg} />

    <br />

    <span>hidden:</span>
    <input type="checkbox" oninput={updateNodeHidden} />
  </Panel>
  <Background />
</SvelteFlow>
