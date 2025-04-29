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
      data: { label: 'child' },
      position: { x: 10, y: 10 },
      parentId: 'A',
    },
    {
      id: 'A-2',
      data: { label: "child with extent: 'parent'" },
      position: { x: 10, y: 80 },
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

<SvelteFlow bind:nodes bind:edges fitView autoPanOnNodeDrag={false}>
  <Background />
</SvelteFlow>
