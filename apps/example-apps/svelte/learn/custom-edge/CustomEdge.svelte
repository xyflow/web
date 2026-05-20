<script lang="ts">
  import { BaseEdge, getStraightPath, type EdgeProps } from '@xyflow/svelte';

  let { id, sourceX, sourceY, targetX, targetY }: EdgeProps = $props();

  let [edgePath] = $derived(
    getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    }),
  );
</script>

<BaseEdge {id} path={edgePath} />
