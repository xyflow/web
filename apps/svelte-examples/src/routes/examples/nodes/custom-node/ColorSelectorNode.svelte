<script>
  import { Handle, Position } from '@xyflow/svelte';

  export let data;
  export let isConnectable;
</script>

<Handle
  type="target"
  position={Position.Left}
  style="background: #555;"
  on:connect={(params) => console.log('handle onConnect', params)}
  {isConnectable}
/>
<div>
  Custom Color Picker Node: <strong>{data.color}</strong>
</div>
<input class="nodrag" type="color" on:input={data.onChange} value={data.color} />
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
