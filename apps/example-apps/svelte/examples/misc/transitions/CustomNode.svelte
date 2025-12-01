<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { data }: NodeProps = $props();
</script>

<!-- Use "|global" because the component is unmounted higher up the tree -->
<div transition:fade|global>
  {data.label}
  <Handle type="target" position={Position.Top} />
  <Handle type="source" position={Position.Bottom} />
</div>
