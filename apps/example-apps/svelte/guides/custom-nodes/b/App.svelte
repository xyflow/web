<script>
  import { writable } from 'svelte/store';
  import { SvelteFlow } from '@xyflow/svelte';

  import ColorPickerNode from './ColorPickerNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1',
      type: 'colorPicker',
      data: { color: writable('#ff4000') },
      position: { x: 0, y: 0 },
    },
    {
      id: '2',
      type: 'colorPicker',
      data: { color: writable('#ffffff') },
      position: { x: 200, y: 0 },
    },
  ]);

  let edges = $state.raw([]);

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
    style="background-color: color-mix(in srgb, {nodes[0].data.color}, {nodes[1]
      .data.color});"
    attributionPosition="top-right"
  />
</div>
