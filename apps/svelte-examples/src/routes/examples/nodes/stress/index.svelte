<script lang="ts">
  //FIXME: Updates not working correctly
  import { SvelteFlow, Background, Controls, MiniMap, useSvelteFlow } from '@xyflow/svelte';
  import type { Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';
  import { createNodesAndEdges } from './utils';

  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(10, 10);
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable(initialEdges);

  const svelteFlow = useSvelteFlow();

  function updatePos() {
    svelteFlow.nodes.update((nodes) => {
      nodes.forEach((node) => {
        node.position = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        };
      });
      return nodes;
    });

    // svelteFlow.nodes.update((node) => {
    //   node.position = {
    //     x: Math.random() * window.innerWidth,
    //     y: Math.random() * window.innerHeight
    //   };
    // });
    // $nodes = $nodes;
  }
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} {defaultViewport} minZoom={0.2} maxZoom={4}>
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
