<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let data: $$Props['data'];
</script>

<div class="node">
  <Handle
    type="source"
    position={Position.Left}
    id="left"
    on:connect
    on:connectend
    on:connectstart
  />
  {data?.label}
  <Handle
    type="source"
    position={Position.Right}
    id="right"
    on:connect
    on:connectend
    on:connectstart
  />
</div>

<style>
  .node {
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
  }
</style>
