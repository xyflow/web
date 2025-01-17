<script lang="ts">
  import {
    Position,
    type NodeProps,
    Handle,
    useNodeConnections,
  } from '@xyflow/svelte';

  let {}: NodeProps = $props();

  const connections = useNodeConnections({ handleType: 'target' });

  let isConnectable = $derived(connections.current.length === 0);
</script>

<div class="customNode">
  <Handle type="target" position={Position.Left} {isConnectable} />
  <div>Connection Limit 1</div>
</div>

<style>
  .customNode {
    background: white;
    padding: 12px;
    border-radius: 20px;
    border: 1px solid black;
  }
</style>
