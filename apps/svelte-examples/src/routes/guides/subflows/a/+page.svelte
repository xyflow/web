<script>
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodes = writable([
    {
      id: 'A',
      type: 'group',
      data: {},
      position: { x: 0, y: 0 },
      style: 'width: 170px; height: 140px;'
    },
    {
      id: 'B',
      type: 'input',
      data: { label: 'child 1' },
      position: { x: 10, y: 10 },
      parentId: 'A',
      extent: 'parent'
    },
    {
      id: 'C',
      data: { label: 'child 2' },
      position: { x: 10, y: 90 },
      parentId: 'A',
      extent: 'parent'
    }
  ]);

  const edges = writable([]);
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} fitView autoPanOnNodeDrag={false} attributionPosition="top-right">
    <Background bgColor="rgba(255, 240, 137, 0.25)" />
  </SvelteFlow>
</div>
