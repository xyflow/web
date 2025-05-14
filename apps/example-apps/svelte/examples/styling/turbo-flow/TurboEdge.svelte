<script lang="ts">
  import { type EdgeProps, getBezierPath } from '@xyflow/svelte';

  let {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    markerEnd,
    id,
  }: EdgeProps = $props();

  let [edgePath] = $derived.by(() => {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;
    return getBezierPath({
      // we need this little hack in order to display the gradient for a straight line
      sourceX: xEqual ? sourceX + 0.0001 : sourceX,
      sourceY: yEqual ? sourceY + 0.0001 : sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
  });
</script>

<path {id} class="svelte-flow__edge-path" d={edgePath} marker-end={markerEnd} />
