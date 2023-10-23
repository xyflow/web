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
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      type: 'colorPicker',
      data: { color: writable('#ffffff') },
      position: { x: 200, y: 0 }
    }
  ]);

  const edges = writable([]);

  const nodeTypes = {
    colorPicker: ColorPickerNode
  };

  $: colorA = $nodes[0].data.color;
  $: colorB = $nodes[1].data.color;
</script>

<div style="height:100vh;">
  <SvelteFlow
    {nodes}
    {edges}
    {nodeTypes}
    fitView
    style="background-color: color-mix(in srgb, {$colorA}, {$colorB});"
    attributionPosition="top-right"
  />
</div>
