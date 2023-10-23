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

  $: updateNode({ nodeName });
  $: updateNode({ nodeBg });
  $: updateNode({ nodeHidden });

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
          node.data.label = nodeName;
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
    <div class="updatenode__controls">
      <label>label:</label>
      <input value={nodeName} on:input={(evt) => (nodeName = evt.target?.value)} />

      <label class="updatenode__bglabel">background:</label>
      <input value={nodeBg} on:input={(evt) => (nodeBg = evt.target?.value)} />

      <div class="updatenode__checkboxwrapper">
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

  :gloabl(.updatenode__checkboxwrapper) {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
</style>
