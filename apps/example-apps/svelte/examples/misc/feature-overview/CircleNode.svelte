<script module>
  export type CircleNode = Node<{}>;
</script>

<script lang="ts">
  import { type NodeProps, Handle, type Node, Position } from '@xyflow/svelte';

  let { positionAbsoluteX, positionAbsoluteY }: NodeProps = $props();

  let label = $derived(
    `Position x:${Math.round(positionAbsoluteX)} y:${Math.round(positionAbsoluteY)}`,
  );
</script>

<div>{label || 'no node connected'}</div>
<Handle type="target" position={Position.Left} class="custom-handle" />
