<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let data: $$Props['data'];
  export let isConnectable: $$Props['isConnectable'];
</script>

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />
<div>
  Custom Color Picker Node: <strong>{data.color}</strong>
</div>
<input class="nodrag" type="color" on:input={data.onInput} value={data.color} />
<Handle
  type="source"
  position={Position.Right}
  id="a"
  style="top: 10'; background: #555;"
  {isConnectable}
/>
<Handle
  type="source"
  position={Position.Right}
  id="b"
  style="bottom: 10; top: auto; background: #555;"
  {isConnectable}
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
