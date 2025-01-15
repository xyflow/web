<script lang="ts">
  import {
    getBezierPath,
    BaseEdge,
    EdgeLabelRenderer,
    useEdges,
    type EdgeProps,
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

  const edges = useEdges();
  const onEdgeClick = () => {
    edges.update((eds) => eds.filter((edge) => edge.id !== id));
  };
</script>

<BaseEdge path={edgePath} {markerEnd} {style} />
<EdgeLabelRenderer>
  <div
    class="button-edge__label nodrag nopan"
    style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
  >
    <button class="button-edge__button" onclick={onEdgeClick}> × </button>
  </div>
</EdgeLabelRenderer>
