<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { data }: NodeProps = $props();
</script>

<Handle type="source" position={Position.Left} id="left" />
{data?.label}
<Handle type="source" position={Position.Right} id="right" />
