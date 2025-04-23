<script module>
  export type ResultNodeType = Node<{}, 'result'>;
</script>

<script lang="ts">
  import {
    Handle,
    Position,
    useNodeConnections,
    useNodeConnections,
    useNodesData,
    type NodeProps,
    type Node,
  } from '@xyflow/svelte';

  let { id }: NodeProps<ResultNodeType> = $props();

  const connections = useNodeConnections({
    id,
    handleType: 'target',
  });

  const nodesData = useNodesData(
    connections.current.map((connection) => connection.source),
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
