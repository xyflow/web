<script lang="ts">
  import {
    getStraightPath,
    useInternalNode,
    type EdgeProps,
  } from '@xyflow/svelte';

  import { getEdgeParams } from './utils';

  let { source, target, markerEnd, style, id }: EdgeProps = $props();

  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  let edgePath: string | undefined = $derived.by(() => {
    if (sourceNode.current && targetNode.current) {
      const edgeParams = getEdgeParams(sourceNode.current, targetNode.current);
      return getStraightPath({
        sourceX: edgeParams.sx,
        sourceY: edgeParams.sy,
        targetX: edgeParams.tx,
        targetY: edgeParams.ty,
      })[0];
    }
    return undefined;
  });
</script>

<path {id} marker-end={markerEnd} d={edgePath} {style} />
