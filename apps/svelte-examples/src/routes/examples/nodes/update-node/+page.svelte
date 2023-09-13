<script lang="ts">
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import type { Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes = [
    { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } }
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable(initialEdges);

  let nodeName = 'Node 1';
  let nodeBg = '#eee';
  let nodeHidden = false;

  $: updateNode({ nodeName });
  $: updateNode({ nodeBg });
  $: updateNode({ nodeHidden });

  function updateNode({ nodeName, nodeBg, nodeHidden }) {
    $nodes.forEach((node) => {
      if (node.id === '1') {
        if (nodeName) {
          node.data.label = nodeName;
        }

        if (nodeBg) {
          node.style = `background: ${nodeBg}`;
        }

        if (nodeHidden !== undefined) {
          // FIXME: node.hidden does not work, edge hidden not available
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
  <SvelteFlow {nodes} {edges} {defaultViewport} minZoom={0.2} maxZoom={4}>
    <div class="updatenode__controls">
      <label>label:</label>
      <input value={nodeName} on:input={(evt) => (nodeName = evt.target.value)} />

      <label class="updatenode__bglabel">background:</label>
      <input value={nodeBg} on:input={(evt) => (nodeBg = evt.target.value)} />

      <div class="updatenode__checkboxwrapper">
        <label>hidden:</label>
        <input
          type="checkbox"
          checked={nodeHidden}
          on:input={(evt) => (nodeHidden = evt.target.checked)}
        />
      </div>
    </div>
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
