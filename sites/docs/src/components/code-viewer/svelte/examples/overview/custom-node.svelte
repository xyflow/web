<script>
  import { Handle, Position } from '@xyflow/svelte';

  export let data = { label: 'Node' };
  export let xPos = 0;
  export let yPos = 0;
</script>

<div class="custom">
  <div>{data.label}</div>
  <div>{~~xPos}, {~~yPos}</div>

  <Handle type="target" position={Position.Top} />

  <Handle type="source" position={Position.Bottom} style="left: 10%;" id="a" />
  <Handle type="source" position={Position.Bottom} id="b" />
  <Handle type="source" position={Position.Bottom} style="left: 90%;" id="c" />
</div>

<style>
  .custom {
    background: #ffcc00;
    padding: 10px;
  }
</style>