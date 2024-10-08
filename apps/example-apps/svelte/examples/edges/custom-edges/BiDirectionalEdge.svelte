<script lang="ts">
  import { useEdges, type EdgeProps, getBezierPath, BaseEdge } from '@xyflow/svelte';

  type $$Props = EdgeProps;

  export let target: $$Props['target'];
  export let source: $$Props['source'];
  export let sourceX: $$Props['sourceX'];
  export let sourceY: $$Props['sourceY'];
  export let sourcePosition: $$Props['sourcePosition'];
  export let targetX: $$Props['targetX'];
  export let targetY: $$Props['targetY'];
  export let targetPosition: $$Props['targetPosition'];
  export let markerEnd: $$Props['markerEnd'] = undefined;

  const edges = useEdges();

  let isBidirectionalEdge: boolean;
  $: isBidirectionalEdge = $edges.some(
    (e) =>
      (e.source === target && e.target === source) || (e.target === source && e.source === target)
  );

  let path: string;
  $: {
    const edgePathParams = {
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition
    };

    if (isBidirectionalEdge) {
      path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25);
    } else {
      [path] = getBezierPath(edgePathParams);
    }
  }

  function getSpecialPath(
    {
      sourceX,
      sourceY,
      targetX,
      targetY
    }: { sourceX: number; sourceY: number; targetX: number; targetY: number },
    offset: number
  ) {
    const centerX = (sourceX + targetX) / 2;
    const centerY = (sourceY + targetY) / 2;

    return `M ${sourceX} ${sourceY} Q ${centerX} ${centerY + offset} ${targetX} ${targetY}`;
  }
</script>

<BaseEdge {path} {markerEnd} />
