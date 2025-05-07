<script lang="ts">
  import {
    SvelteFlow,
    type Node,
    type Edge,
    type EdgeTypes,
    Background,
  } from '@xyflow/svelte';
  import StepEdge from './StepEdge.svelte';
  import SineEdge from './SineEdge.svelte';

  import '@xyflow/svelte/dist/style.css';

  const edgeTypes: EdgeTypes = {
    steps: StepEdge,
    sine: SineEdge,
  };

  let nodes = $state.raw<Node[]>([
    { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
    { id: 'b', position: { x: 200, y: 100 }, data: { label: 'Node B' } },
    { id: 'c', position: { x: 0, y: 200 }, data: { label: 'Node C' } },
    { id: 'd', position: { x: 200, y: 300 }, data: { label: 'Node D' } },
  ]);
  let edges = $state.raw<Edge[]>([
    { id: 'a->b', type: 'step', source: 'a', target: 'b' },
    { id: 'c->d', type: 'sine', source: 'c', target: 'd' },
  ]);
</script>

<SvelteFlow bind:nodes bind:edges {edgeTypes} fitView>
  <Background />
</SvelteFlow>
