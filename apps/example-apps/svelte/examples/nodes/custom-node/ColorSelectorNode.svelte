<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import { bgColor } from './App.svelte';

  let { isConnectable }: NodeProps = $props();
</script>

<Handle type="target" position={Position.Left} {isConnectable} />
<div>
  Custom Color Picker Node: <strong>{bgColor.current}</strong>
</div>
<input class="nodrag" type="color" bind:value={bgColor.current} />
<Handle type="source" position={Position.Right} {isConnectable} />
