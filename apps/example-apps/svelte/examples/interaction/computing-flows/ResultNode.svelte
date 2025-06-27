<script module>
  export type ResultNodeType = Node<{}, 'result'>;
</script>

<script lang="ts">
  import {
    Handle,
    Position,
    useNodeConnections,
    useNodesData,
    type NodeProps,
    type Node,
  } from '@xyflow/svelte';

  let connections = useNodeConnections({
    handleType: 'target',
  });

  const nodesData = $derived(
    useNodesData(connections.current.map((connection) => connection.source)),
  );
</script>

<div class="custom">
  <Handle type="target" position={Position.Left} />
  <div class="label">incoming texts:</div>

  {#if nodesData.current.length === 0}
    <div>no connected nodes</div>
  {:else}
    {#each nodesData.current as nodeData}
      <div>{nodeData.data.text}</div>
    {/each}
  {/if}
</div>

<style>
  .label {
    margin-bottom: 5px;
  }
</style>
