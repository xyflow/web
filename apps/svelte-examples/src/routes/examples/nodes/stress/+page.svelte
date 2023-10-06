<script>
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import { writable } from 'svelte/store';
  import { createNodesAndEdges } from './utils';

  import '@xyflow/svelte/dist/style.css';

  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(15, 30);
  const nodes = writable(initialNodes);
  const edges = writable(initialEdges);

  function updatePos() {
    $nodes.forEach((node) => {
      node.position = {
        x: Math.random() * 1500,
        y: Math.random() * 1500
      };
    });
    $nodes = $nodes;
  }
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} minZoom={0} fitView>
    <Background />
    <MiniMap />
    <Controls />
    <button on:click={updatePos} class="scramble-button"> change pos </button>
  </SvelteFlow>
</div>

<style>
  .scramble-button {
    position: absolute;
    right: 10px;
    top: 30px;
    z-index: 4;
  }
</style>
