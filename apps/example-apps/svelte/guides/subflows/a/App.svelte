<script lang="ts">
  import { SvelteFlow, Background, type Node } from '@xyflow/svelte';

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
  ]);

  let edges = $state.raw([]);
</script>

<SvelteFlow bind:nodes bind:edges fitView autoPanOnNodeDrag={false}>
  <Background />
</SvelteFlow>
