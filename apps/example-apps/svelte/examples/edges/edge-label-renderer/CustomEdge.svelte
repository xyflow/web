<script lang="ts">
  import {
    type EdgeProps,
    getBezierPath,
    BaseEdge,
    EdgeLabelRenderer,
  } from '@xyflow/svelte';

  let {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    data,
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
</script>

<BaseEdge path={edgePath} />
<EdgeLabelRenderer>
  <div
    style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
    class="edge-label-renderer__custom-edge nodrag nopan"
  >
    {data.label}
  </div>
</EdgeLabelRenderer>
