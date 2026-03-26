<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import { selectedColor } from './App.svelte';

  let { isConnectable }: NodeProps = $props();
</script>

<Handle type="target" position={Position.Left} {isConnectable} />
<div>Custom Color Picker Node</div>
<input class="nodrag color-input" type="color" bind:value={selectedColor.current} />
<Handle type="source" position={Position.Right} {isConnectable} />
