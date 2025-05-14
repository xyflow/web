<script lang="ts">
  import {
    Handle,
    Position,
    useConnection,
    type NodeProps,
  } from '@xyflow/svelte';

  let { id }: NodeProps = $props();

  const connection = useConnection();

  let isTarget = $derived(
    connection.current.inProgress &&
      connection.current.fromHandle?.nodeId !== id,
  );

  let label = $derived(isTarget ? 'Drop here' : 'Drag to connect');
</script>

<div class="customNode">
  <div class="customNodeBody">
    <!-- If handles are conditionally rendered and not present initially, you need to update the node internals https://svelteflow.dev/docs/api/hooks/use-update-node-internals/
    In this case we don't need to use useUpdateNodeInternals, since !isConnecting is true at the beginning and all handles are rendered initially. -->
    {#if !connection.current.inProgress}
      <Handle
        class="customHandle"
        position={Position.Right}
        type="source"
        style="z-index: 1;"
      />
    {/if}
    <Handle
      class="customHandle"
      position={Position.Left}
      type="target"
      isConnectableStart={false}
    />
    {label}
  </div>
</div>
