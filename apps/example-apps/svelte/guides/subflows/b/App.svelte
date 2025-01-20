<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw<Node[]>([
    {
      id: 'A',
      type: 'group',
      data: {},
      position: { x: 0, y: 0 },
      style: 'width: 170px; height: 140px;',
    },
    {
      id: 'A-1',
      type: 'input',
      data: { label: 'child 1' },
      position: { x: 10, y: 10 },
      parentId: 'A',
      extent: 'parent',
    },
    {
      id: 'A-2',
      data: { label: 'child 2' },
      position: { x: 10, y: 90 },
      parentId: 'A',
      extent: 'parent',
    },
    {
      id: 'B',
      type: 'output',
      position: { x: -100, y: 200 },
      data: { label: 'node b' },
    },
    {
      id: 'C',
      type: 'output',
      position: { x: 100, y: 200 },
      data: { label: 'node c' },
    },
  ]);

  let edges = $state.raw<Edge[]>([
    { id: 'a1-a2', source: 'A-1', target: 'A-2' },
    { id: 'a2-b', source: 'A-2', target: 'B' },
    { id: 'a2-c', source: 'A-2', target: 'C' },
  ]);
</script>

<div style="height:100vh;">
  <SvelteFlow
    bind:nodes
    bind:edges
    fitView
    autoPanOnNodeDrag={false}
    attributionPosition="top-right"
  >
    <Background bgColor="rgba(255, 240, 137, 0.25)" />
  </SvelteFlow>
</div>
