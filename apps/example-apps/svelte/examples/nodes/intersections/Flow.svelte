<script lang="ts">
  import {
    SvelteFlow,
    Background,
    Controls,
    useSvelteFlow,
    type Node,
    type Edge,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const { getIntersectingNodes } = $derived(useSvelteFlow());

  function onNodeDrag({ targetNode }) {
    const intersections = getIntersectingNodes(targetNode).map((n) => n.id);

    nodes = nodes.map((n) => {
      const clas = intersections.includes(n.id) ? 'highlight' : '';
      if (n.class !== clas) {
        return { ...n, class: clas };
      }
      return n;
    });
  }
</script>

<div style="height:100vh;">
  <SvelteFlow
    bind:nodes
    bind:edges
    fitView
    class="intersection-flow"
    onnodedrag={onNodeDrag}
  >
    <Background />
    <Controls />
  </SvelteFlow>
</div>

<style>
  :global(.svelte-flow.intersection-flow .svelte-flow__node.highlight) {
    background-color: #ff0072 !important;
    color: white;
  }

  :global(.svelte-flow.intersection-flow .svelte-flow__node) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    border-radius: 1px;
    border-width: 2px;
    box-shadow: 6px 6px 0 1px rgba(0, 0, 0, 0.7);
  }

  :global(
      .svelte-flow.intersection-flow .svelte-flow__node.selected,
      .svelte-flow.intersection-flow .svelte-flow__node:hover,
      .svelte-flow.intersection-flow .svelte-flow__node:focus
    ) {
    box-shadow: 6px 6px 0 1px rgba(0, 0, 0, 0.7);
    background-color: #eee;
  }

  :global(.svelte-flow.intersection-flow .svelte-flow__handle) {
    display: none;
  }
</style>
