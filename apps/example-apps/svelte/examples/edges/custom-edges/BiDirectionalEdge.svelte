<script lang="ts">
  import {
    useEdges,
    type EdgeProps,
    getBezierPath,
    BaseEdge,
  } from '@xyflow/svelte';

  let {
    target,
    source,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    markerEnd,
  }: EdgeProps = $props();

  const edges = useEdges();

  let isBidirectionalEdge = $derived(
    edges.current.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target),
    ),
  );

  function getSpecialPath(
    {
      sourceX,
      sourceY,
      targetX,
      targetY,
    }: { sourceX: number; sourceY: number; targetX: number; targetY: number },
    offset: number,
  ) {
    const centerX = (sourceX + targetX) / 2;
    const centerY = (sourceY + targetY) / 2;

    return `M ${sourceX} ${sourceY} Q ${centerX} ${centerY + offset} ${targetX} ${targetY}`;
  }

  let path: string = $derived.by(() => {
    const edgePathParams = {
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    };

    if (isBidirectionalEdge) {
      return getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25);
    } else {
      const [path] = getBezierPath(edgePathParams);
      return path;
    }
  });
</script>

<BaseEdge {path} {markerEnd} />
