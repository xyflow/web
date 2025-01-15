<script lang="ts">
  import { SvelteFlow, Background, type Edge, type Node } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: Node[] = [
    { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  ];

  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw(initialEdges);

  let nodeName = $state('Node 1');
  let nodeBg = $state('#eee');
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

<div style="height:100vh;">
  <SvelteFlow bind:nodes bind:edges fitView>
    <div class="updatenode__controls">
      <label>label:</label>
      <input value={nodeName} oninput={updateNodeName} />

      <label class="updatenode__bglabel">background:</label>
      <input value={nodeBg} oninput={updateNodeBg} />

      <div class="updatenode__checkboxwrapper">
        <label>hidden:</label>
        <input type="checkbox" oninput={updateNodeHidden} />
      </div>
    </div>
    <Background />
  </SvelteFlow>
</div>

<style>
  :global(.updatenode__controls) {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 4;
    font-size: 12px;
  }

  :global(.updatenode__controls label) {
    display: block;
  }

  :global(.updatenode__bglabel) {
    margin-top: 10px;
  }

  :global(.updatenode__checkboxwrapper) {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
</style>
