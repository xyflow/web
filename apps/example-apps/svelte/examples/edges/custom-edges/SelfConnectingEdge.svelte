<script lang="ts">
  import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/svelte';

  let {
    target,
    source,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
  }: EdgeProps = $props();

  let path: string = $derived.by(() => {
    if (target === source) {
      const radiusX = (sourceX - targetX) * 0.6;
      const radiusY = 50;
      return `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX + 2} ${targetY}`;
    } else {
      const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });
      return path;
    }
  });
</script>

<BaseEdge {path} {markerEnd} />
