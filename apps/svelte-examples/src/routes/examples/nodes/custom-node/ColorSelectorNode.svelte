<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let data: $$Props['data'];
  export let isConnectable: $$Props['isConnectable'];

  const { color } = data;
</script>

<Handle
  type="target"
  position={Position.Left}
  style="background: #555;"
  {isConnectable}
  on:connect
  on:connectend
  on:connectstart
/>
<div>
  Custom Color Picker Node: <strong>{$color}</strong>
</div>
<input
  class="nodrag"
  type="color"
  on:input={(event) => {
    $color = event.currentTarget.value;
  }}
  value={$color}
/>
<Handle
  type="source"
  position={Position.Right}
  id="a"
  style="top: 10px; background: #555;"
  {isConnectable}
  on:connect
  on:connectend
  on:connectstart
/>
<Handle
  type="source"
  position={Position.Right}
  id="b"
  style="bottom: 10px; top: auto; background: #555;"
  {isConnectable}
  on:connect
  on:connectend
  on:connectstart
/>

<style>
  :global(.svelte-flow__node-selectorNode) {
    font-size: 12px;
    background: #eee;
    border: 1px solid #555;
    border-radius: 5px;
    text-align: center;
  }
</style>
