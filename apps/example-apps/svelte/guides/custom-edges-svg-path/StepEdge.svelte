<script lang="ts">
  import { BaseEdge, type EdgeProps } from '@xyflow/svelte';

  let { id, sourceX, sourceY, targetX, targetY }: EdgeProps = $props();

  const centerY = $derived((targetY - sourceY) / 2 + sourceY);

  const edgePath = $derived(
    `M ${sourceX} ${sourceY} L ${sourceX} ${centerY} L ${targetX} ${centerY} L ${targetX} ${targetY}`,
  );
</script>

<BaseEdge {id} path={edgePath} />
