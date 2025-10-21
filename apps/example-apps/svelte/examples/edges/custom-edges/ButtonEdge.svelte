<script lang="ts">
  import {
    getBezierPath,
    BaseEdge,
    type EdgeProps,
    useSvelteFlow,
    EdgeLabel,
  } from '@xyflow/svelte';

  let {
    id,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    markerEnd,
    style,
  }: EdgeProps = $props();

  let [edgePath, labelX, labelY] = $derived(
    getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    }),
  );

  const { deleteElements } = useSvelteFlow();

  const onEdgeClick = () => {
    deleteElements({ edges: [{ id }] });
  }
</script>

<BaseEdge path={edgePath} {markerEnd} {style} />
<EdgeLabel x={labelX} y={labelY} class="button-edge__label">
  <button class="button-edge__button" onclick={onEdgeClick}> × </button>
</EdgeLabel>
