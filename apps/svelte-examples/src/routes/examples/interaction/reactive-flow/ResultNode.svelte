<script lang="ts">
  import {
    Handle,
    Position,
    useHandleConnections,
    useNodesData,
    type NodeProps
  } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let id: $$Props['id'];

  const connections = useHandleConnections({
    nodeId: id,
    type: 'target'
  });

  $: nodeData = useNodesData($connections.map((connection) => connection.source));
</script>

<div class="custom">
  <Handle type="target" position={Position.Left} />
  <div class="label">incoming texts:</div>

  {#if $nodeData.length === 0}
    <div>no connected nodes</div>
  {:else}
    {#each $nodeData as data}
      <div>{data.text}</div>
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
