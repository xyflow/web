<script lang="ts">
  import {
    SvelteFlow,
    type Node,
    type Edge,
    type EdgeTypes,
    Background,
  } from '@xyflow/svelte';
  import CustomEdge from './CustomEdge.svelte';

  import '@xyflow/svelte/dist/style.css';

  const edgeTypes: EdgeTypes = {
    'custom-edge': CustomEdge,
  };

  let nodes = $state.raw<Node[]>([
    { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
    { id: 'b', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
    { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
  ]);
  let edges = $state.raw<Edge[]>([
    { id: 'a->b', type: 'custom-edge', source: 'a', target: 'b' },
    { id: 'b->c', type: 'custom-edge', source: 'b', target: 'c' },
  ]);
</script>

<SvelteFlow bind:nodes bind:edges {edgeTypes} fitView>
  <Background />
</SvelteFlow>
