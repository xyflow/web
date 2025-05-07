<script lang="ts">
  import {
    Handle,
    Position,
    useNodeConnections,
    useNodesData,
    type NodeProps
  } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const connections = useNodeConnections({
    id,
    handleType: 'target'
  });

  $: nodesData = useNodesData($connections.map((connection) => connection.source));
</script>

<div class="custom">
  <Handle type="target" position={Position.Left} />
  <div class="label">incoming texts:</div>

  {#if $nodesData.length === 0}
    <div>no connected nodes</div>
  {:else}
    {#each $nodesData as nodeData}
      <div>{nodeData.data.text}</div>
    {/each}
  {/if}
</div>

<style>
  .custom {
    background-color: #eee;
    padding: 10px;
    border-radius: 10px;
    font-size: 12px;
  }

  .label {
    margin-bottom: 5px;
  }
</style>
