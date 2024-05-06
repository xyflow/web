<script lang="ts">
  import { getBezierPath, type EdgeProps, useInternalNode } from '@xyflow/svelte';
  import { getEdgeParams } from './utils';

  type $$Props = EdgeProps;

  export let source: $$Props['source'];
  export let target: $$Props['target'];
  export let id: $$Props['id'];

  $: sourceNode = useInternalNode(source);
  $: targetNode = useInternalNode(target);

  let edgePath: string | undefined;

  $: {
    console.log(1233);
  }

  $: {
    if (sourceNode && targetNode) {
      const edgeParams = getEdgeParams(sourceNode, targetNode);
      edgePath = getBezierPath({
        sourceX: edgeParams.sx,
        sourceY: edgeParams.sy,
        sourcePosition: edgeParams.sourcePos,
        targetPosition: edgeParams.targetPos,
        targetX: edgeParams.tx,
        targetY: edgeParams.ty
      })[0];
    } else {
      edgePath = undefined;
    }
  }
</script>

<path class="svelte-flow__edge-path" {id} d={edgePath} />
