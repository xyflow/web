<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, type Edge, type Node } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: Node[] = [
    { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } }
  ];

  const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable(initialEdges);

  let nodeName = 'Node 1';
  let nodeBg = '#eee';
  let nodeHidden = false;

  $: updateNode({ nodeName, nodeBg, nodeHidden });

  function updateNode({
    nodeName,
    nodeBg,
    nodeHidden
  }: {
    nodeName?: string;
    nodeBg?: string;
    nodeHidden?: boolean;
  }) {
    $nodes.forEach((node) => {
      if (node.id === '1') {
        if (nodeName) {
          // IMPORTANT: You need to mutate the data object
          // otherwise the node will not be updated
          node.data = {
            ...node.data,
            label: nodeName
          };
        }

        if (nodeBg) {
          node.style = `background: ${nodeBg}`;
        }

        if (nodeHidden !== undefined) {
          node.hidden = nodeHidden;

          $edges.forEach((edge) => {
            if (edge.id === 'e1-2') {
              edge.hidden = nodeHidden;
            }
          });
        }

        $nodes = $nodes;
        $edges = $edges;
      }
    });
  }
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} fitView>
    <div class="update-node__controls">
      <label>label:</label>
      <input value={nodeName} on:input={(evt) => (nodeName = evt.target?.value)} />

      <label class="update-node__bg-label">background:</label>
      <input value={nodeBg} on:input={(evt) => (nodeBg = evt.target?.value)} />

      <div class="update-node__checkbox-wrapper">
        <label>hidden:</label>
        <input
          type="checkbox"
          checked={nodeHidden}
          on:input={(evt) => (nodeHidden = evt.target?.checked)}
        />
      </div>
    </div>
    <Background />
  </SvelteFlow>
</div>

<style>
  :global(.update-node__controls) {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 4;
    font-size: 12px;
  }

  :global(.update-node__controls label) {
    display: block;
  }

  :global(.update-node__bg-label) {
    margin-top: 10px;
  }

  :global(.update-node__checkbox-wrapper) {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
</style>
