<script lang="ts">
  import {
    getBezierPath,
    BaseEdge,
    EdgeLabelRenderer,
    useStore,
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
    data,
  }: EdgeProps = $props();

  const store = useStore();

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
  {#if data.startLabel}
    <div
      onclick={() => store.handleEdgeSelection(id)}
      style:transform={`translate(-50%, 0%) translate(${sourceX}px,${sourceY}px)`}
      class="edge-label nodrag nopan"
    >
      {data.startLabel}
    </div>
  {/if}
  {#if data.endLabel}
    <div
      onclick={() => store.handleEdgeSelection(id)}
      style:transform={`translate(-50%, -100%) translate(${targetX}px,${targetY}px)`}
      class="edge-label nodrag nopan"
    >
      {data.endLabel}
    </div>
  {/if}
</EdgeLabelRenderer>

<style>
  .edge-label {
    position: absolute;
    pointer-events: all;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.75);
    padding: 5px 10px;
    font-weight: 700;
    font-size: 12;
    border-radius: 5px;
    font-size: 12px;
    color: #ff5050;
  }
</style>
