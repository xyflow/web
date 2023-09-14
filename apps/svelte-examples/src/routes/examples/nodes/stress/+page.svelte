<script>
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import { writable } from 'svelte/store';
  import { createNodesAndEdges } from './utils';
  import '@xyflow/svelte/dist/style.css';

  const initialViewport = { x: 0, y: 0, zoom: 0.5 };

  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(10, 10);
  const nodes = writable(initialNodes);
  const edges = writable(initialEdges);

  function updatePos() {
    $nodes.forEach((node) => {
      node.position = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      };
    });
    $nodes = $nodes;
  }
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {initialViewport} minZoom={0.2} maxZoom={4}>
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
