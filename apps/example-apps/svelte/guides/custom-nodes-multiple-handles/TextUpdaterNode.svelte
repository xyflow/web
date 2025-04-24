<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';

  export let data;
  export let isConnectable;

  const handleStyle = 'left: 10px';

  function onChange(evt: Event) {
    console.log((evt.target as HTMLInputElement).value);
  }
</script>

<div class="text-updater-node">
  <Handle type="target" position={Position.Top} {isConnectable} />
  <div>
    <label for="text">Text:</label>
    <input id="text" name="text" on:change={onChange} class="nodrag" />
  </div>
  <Handle
    type="source"
    position={Position.Bottom}
    id="a"
    style={handleStyle}
    {isConnectable}
  />
  <Handle type="source" position={Position.Bottom} id="b" {isConnectable} />
</div>

<style>
  .text-updater-node {
    height: 50px;
    border: 1px solid #eee;
    padding: 5px;
    border-radius: 5px;
    background: white;
  }

  .text-updater-node label {
    display: block;
    color: #777;
    font-size: 12px;
  }
</style>
