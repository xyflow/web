<script lang="ts">
  import {
    getBezierPath,
    type EdgeProps,
    useInternalNode,
  } from '@xyflow/svelte';

  import { getEdgeParams } from './utils';

  let { source, target, id }: EdgeProps = $props();

  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  let edgePath: string | undefined = $derived.by(() => {
    if (sourceNode.current && targetNode.current) {
      const edgeParams = getEdgeParams(sourceNode.current, targetNode.current);
      return getBezierPath({
        sourceX: edgeParams.sx,
        sourceY: edgeParams.sy,
        sourcePosition: edgeParams.sourcePos,
        targetPosition: edgeParams.targetPos,
        targetX: edgeParams.tx,
        targetY: edgeParams.ty,
      })[0];
    }
    return undefined;
  });
</script>

<path class="svelte-flow__edge-path" {id} d={edgePath} />
