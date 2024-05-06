<script lang="ts">
  import { type NodeProps, Handle, Position } from '@xyflow/svelte';

  import type { CircleNode } from './types';

  type $$Props = NodeProps<CircleNode>;

  export let positionAbsoluteX: $$Props['positionAbsoluteX'];
  export let positionAbsoluteY: $$Props['positionAbsoluteY'];
  $$restProps;

  $: label = `position x:${Math.round(positionAbsoluteX)} y:${Math.round(positionAbsoluteY)}`;
</script>

<div class="wrapper gradient">
  <div class="inner">{label || 'no node connected'}</div>
</div>
<Handle type="target" position={Position.Left} />
