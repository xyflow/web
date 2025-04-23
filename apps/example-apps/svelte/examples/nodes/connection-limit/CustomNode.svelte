<script lang="ts">
  import { Position, Handle, useNodeConnections, type NodeProps } from '@xyflow/svelte';

  let {}: NodeProps = $props();

  const connections = useNodeConnections({ handleType: 'target' });

  let isConnectable = $derived(connections.current.length === 0);
</script>

<Handle type="target" position={Position.Left} {isConnectable} />
<div>{'← Only one edge allowed'}</div>
