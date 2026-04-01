<script lang="ts">
  import {
    BaseEdge,
    getStraightPath,
    type EdgeProps,
    EdgeLabel,
    useEdges,
  } from '@xyflow/svelte';

  let { id, sourceX, sourceY, targetX, targetY }: EdgeProps = $props();

  let [edgePath, labelX, labelY] = $derived(
    getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    }),
  );

  const edges = useEdges();
</script>

<BaseEdge {id} path={edgePath} />
<EdgeLabel x={labelX} y={labelY}>
  <button
    class="nodrag nopan"
    onclick={() => {
      edges.update((eds) => eds.filter((edge) => edge.id !== id));
    }}
  >
    delete
  </button>
</EdgeLabel>
