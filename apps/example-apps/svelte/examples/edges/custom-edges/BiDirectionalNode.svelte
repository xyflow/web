<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { data }: NodeProps = $props();
</script>

<div class="node">
  <Handle type="source" position={Position.Left} id="left" />
  {data?.label}
  <Handle type="source" position={Position.Right} id="right" />
</div>

<style>
  .node {
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
  }
</style>
