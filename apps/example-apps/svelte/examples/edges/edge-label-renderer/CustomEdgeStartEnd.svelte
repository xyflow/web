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

  let [edgePath] = $derived(
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
  <EdgeLabelRenderer>
    {#if data.startLabel}
      <div
        style:transform={`translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`}
        class="edge-label nodrag nopan"
      >
        {data.startLabel}
      </div>
    {/if}
    {#if data.endLabel}
      <div
        style:transform={`translate(-50%, -100%) translate(${targetX}px,${targetY}px)`}
        class="edge-label nodrag nopan"
      >
        {data.endLabel}
      </div>
    {/if}
  </EdgeLabelRenderer>
</EdgeLabelRenderer>

<style>
  .edge-label {
    position: absolute;
    background: rgba(255, 255, 255, 0.75);
    padding: 4px 10px;
    border-radius: 5px;
    font-size: 12px;
  }
</style>
