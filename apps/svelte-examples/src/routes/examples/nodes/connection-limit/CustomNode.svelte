<script lang="ts">
  import { Position, type NodeProps, Handle, useEdges } from '@xyflow/svelte';
  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const edges = useEdges();

  $: isConnectable = $edges.filter((edge) => edge.target === id || edge.source === id).length < 1;
</script>

<div class="customNode">
  <Handle
    type="target"
    position={Position.Left}
    {isConnectable}
    on:connect
    on:connectend
    on:connectstart
  />
  <div>Connection Limit 1</div>
</div>

<style>
  .customNode {
    padding: 16px;
    border: 1px solid black;
  }
</style>
