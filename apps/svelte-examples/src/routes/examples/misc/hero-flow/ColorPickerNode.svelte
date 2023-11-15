<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import type { NodeData } from './nodes-and-edges';

  type $$Props = NodeProps;
  export let data: NodeData;
  const { label, flowState } = data;

  let value = $flowState.color;
  $: {
    $flowState.color = value;
  }
</script>

<NodeWrapper {label}>
  <div class="flex items-center space-x-2">
    <input bind:value class="nodrag border-md w-6 h-6" type="color" />
    <p>{value}</p>
  </div>
  <Handle type="source" position={Position.Right} on:connect on:connectend on:connectstart />
</NodeWrapper>
