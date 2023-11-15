<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import type { NodeData } from './nodes-and-edges';

  type $$Props = NodeProps;
  export let data: NodeData;
  const { label, flowState } = data;

  let value = $flowState.zoom;
  $: {
    $flowState.zoom = value;
  }

  const min = 0;
  const max = 40;
</script>

<NodeWrapper {label}>
  <Handle type="source" position={Position.Right} on:connect on:connectend on:connectstart />
  <input
    class="nodrag accent-[#ff4000]"
    style="direction: rtl;"
    type="range"
    {min}
    {max}
    bind:value
  />
</NodeWrapper>
