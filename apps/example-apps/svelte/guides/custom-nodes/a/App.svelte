<script module>
  export class SharedState {
    color = $state('#ff0000');
  }
</script>

<script>
  import { SvelteFlow } from '@xyflow/svelte';

  import ColorPickerNode from './ColorPickerNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  const sharedState = new SharedState();

  let nodes = $state.raw([
    {
      id: '1',
      type: 'colorPicker',
      data: { sharedState },
      position: { x: 0, y: 0 },
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
    attributionPosition="top-right"
  />
</div>
