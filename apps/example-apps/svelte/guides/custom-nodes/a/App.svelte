<script>
  import { writable } from 'svelte/store';
  import { SvelteFlow } from '@xyflow/svelte';

  import ColorPickerNode from './ColorPickerNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodes = writable([
    {
      id: '1',
      type: 'colorPicker',
      data: { color: writable('#ff4000') },
      position: { x: 0, y: 0 },
    },
  ]);

  const edges = writable([]);

  const nodeTypes = {
    colorPicker: ColorPickerNode,
  };
</script>

<div style="height:100vh;">
  <SvelteFlow
    bind:nodes
    bind:edges
    {nodeTypes}
    fitView
    attributionPosition="top-right"
  />
</div>
