<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { isConnectable }: NodeProps = $props();
</script>

<Handle type="target" position={Position.Left} {isConnectable} />

<div>▼</div>
<Handle
  type="source"
  position={Position.Right}
  id="a"
  style="top:5px"
  {isConnectable}
/>
<Handle
  type="source"
  position={Position.Right}
  id="b"
  style="bottom:5px; top:auto"
  {isConnectable}
/>
