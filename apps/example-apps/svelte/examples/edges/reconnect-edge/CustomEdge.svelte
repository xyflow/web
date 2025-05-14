<script lang="ts">
  import {
    BaseEdge,
    EdgeReconnectAnchor,
    getBezierPath,
    EdgeLabel,
    type EdgeProps,
  } from '@xyflow/svelte';

  let { sourceX, sourceY, targetX, targetY, selected, data }: EdgeProps = $props();

  const [edgePath, labelX, labelY] = $derived(
    getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    }),
  );

  let reconnecting = $state(false);
</script>

<!-- We want to hide the initial edge while reconnecting -->
{#if !reconnecting}
  <BaseEdge path={edgePath} />
  <EdgeLabel x={labelX} y={labelY} selectEdgeOnClick>
    Select the edge and drag the ends to reconnect
  </EdgeLabel>
{/if}

<!-- We only want to be able to reconnect when an edge is selected  -->
{#if selected}
  <EdgeReconnectAnchor
    bind:reconnecting
    type="source"
    position={{ x: sourceX, y: sourceY }}
    class={{}}
    style={!reconnecting ? 'background: rgba(255, 64, 0, 0.5); border-radius: 100%;' : ''}
  />
  <EdgeReconnectAnchor
    bind:reconnecting
    type="target"
    position={{ x: targetX, y: targetY }}
    style={!reconnecting ? 'background: rgba(255, 64, 0, 0.5); border-radius: 100%;' : ''}
  />
{/if}
