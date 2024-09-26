<script lang="ts">
  import {
    getBezierPath,
    BaseEdge,
    type EdgeProps,
    EdgeLabelRenderer,
    useEdges
  } from '@xyflow/svelte';

  type $$Props = EdgeProps;

  export let id: $$Props['id'];
  export let sourceX: $$Props['sourceX'];
  export let sourceY: $$Props['sourceY'];
  export let sourcePosition: $$Props['sourcePosition'];
  export let targetX: $$Props['targetX'];
  export let targetY: $$Props['targetY'];
  export let targetPosition: $$Props['targetPosition'];
  export let markerEnd: $$Props['markerEnd'] = undefined;
  export let style: $$Props['style'] = undefined;

  $: [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  const edges = useEdges();

  const onEdgeClick = () => edges.update((eds) => eds.filter((edge) => edge.id !== id));
</script>

<BaseEdge path={edgePath} {markerEnd} {style} />
<EdgeLabelRenderer>
  <div
    class="edgeButtonContainer nodrag nopan"
    style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
  >
    <button class="edgeButton" on:click={onEdgeClick}> × </button>
  </div>
</EdgeLabelRenderer>

<style>
  .edgeButtonContainer {
    position: absolute;
    font-size: 12pt;
    /* everything inside EdgeLabelRenderer has no pointer events by default */
    /* if you have an interactive element, set pointer-events: all */
    pointer-events: all;
  }

  .edgeButton {
    width: 20px;
    height: 20px;
    background: #eee;
    border: 1px solid #fff;
    cursor: pointer;
    border-radius: 50%;
    font-size: 12px;
    line-height: 1;
  }

  .edgeButton:hover {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
  }
</style>
