<script>
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import { createNodesAndEdges } from './utils';

  import '@xyflow/svelte/dist/style.css';

  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(
    15,
    30,
  );

  let nodes = $state.raw(initialNodes);
  let edges = $state.raw(initialEdges);

  function updatePos() {
    nodes = nodes.map((node) => {
      return {
        ...node,
        position: {
          x: Math.random() * 1500,
          y: Math.random() * 1500,
        },
      };
    });
  }
</script>

<div style="height:100vh;">
  <SvelteFlow bind:nodes bind:edges minZoom={0} fitView>
    <Background />
    <MiniMap />
    <Controls />
    <button onclick={updatePos} class="scramble-button"> change pos </button>
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
