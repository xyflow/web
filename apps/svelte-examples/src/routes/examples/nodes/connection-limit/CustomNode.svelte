<script lang="ts">
  import { Position, type NodeProps } from '@xyflow/svelte';
  import CustomHandle from './CustomHandle.svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];
</script>

<div class="customNode">
  <CustomHandle type="target" position={Position.Left} nodeId={id} />
  <div>Connection Limit 1</div>
</div>

<style>
  .customNode {
    padding: 16px;
    border: 1px solid black;
  }
</style>
