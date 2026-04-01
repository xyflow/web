<script lang="ts">
  import { BaseEdge, type EdgeProps } from '@xyflow/svelte';

  let { id, sourceX, sourceY, targetX, targetY }: EdgeProps = $props();

  const centerX = $derived((targetX - sourceX) / 2 + sourceX);
  const centerY = $derived((targetY - sourceY) / 2 + sourceY);

  const edgePath = $derived(`
    M ${sourceX} ${sourceY} 
    Q ${(targetX - sourceX) * 0.2 + sourceX} ${targetY * 1.1} ${centerX} ${centerY}
    Q ${(targetX - sourceX) * 0.8 + sourceX} ${sourceY * 0.9} ${targetX} ${targetY}
  `);
</script>

<BaseEdge {id} path={edgePath} />
