<script lang="ts">
  import {
    BaseEdge,
    getStraightPath,
    useInternalNode,
    type EdgeProps,
  } from '@xyflow/svelte';

  import { getEdgeParams } from './utils';

  let { id, source, target, markerEnd }: EdgeProps = $props();

  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  let path: string | undefined = $derived.by(() => {
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

<BaseEdge {id} {path} {markerEnd} />
