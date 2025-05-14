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

  const { getIntersectingNodes } = useSvelteFlow();

  function onNodeDrag({ targetNode }) {
    const intersections = getIntersectingNodes(targetNode).map((n) => n.id);

    nodes = nodes.map((n) => {
      const _class = intersections.includes(n.id) ? 'highlight' : '';
      if (n.class !== _class) {
        return { ...n, class: _class };
      }
      return n;
    });
  }
</script>

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
