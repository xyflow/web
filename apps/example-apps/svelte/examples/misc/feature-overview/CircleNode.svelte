<script module>
  export type CircleNode = Node<{}>;
</script>

<script lang="ts">
  import { type NodeProps, Handle, type Node, Position } from '@xyflow/svelte';

  let { positionAbsoluteX, positionAbsoluteY }: NodeProps<CircleNode> =
    $props();

  let label = $derived(
    `position x:${Math.round(positionAbsoluteX)} y:${Math.round(positionAbsoluteY)}`,
  );
</script>

<div class="wrapper gradient">
  <div class="inner">{label || 'no node connected'}</div>
</div>
<Handle type="target" position={Position.Left} />
