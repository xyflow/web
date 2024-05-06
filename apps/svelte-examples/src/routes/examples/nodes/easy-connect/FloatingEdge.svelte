<svelte:options immutable />

<script lang="ts">
  import { getStraightPath, useInternalNode, type EdgeProps } from '@xyflow/svelte';
  import { getEdgeParams } from './utils';

  type $$Props = EdgeProps;

  export let source: EdgeProps['source'];
  export let target: EdgeProps['target'];
  export let markerEnd: EdgeProps['markerEnd'] = undefined;
  export let style: EdgeProps['style'] = undefined;
  export let id: EdgeProps['id'];

  let sourceNode = useInternalNode(source);
  let targetNode = useInternalNode(target);

  let edgePath: string | undefined;

  $: {
    if (sourceNode && targetNode) {
      const edgeParams = getEdgeParams(sourceNode, targetNode);
      edgePath = getStraightPath({
        sourceX: edgeParams.sx,
        sourceY: edgeParams.sy,
        targetX: edgeParams.tx,
        targetY: edgeParams.ty
      })[0];
    } else {
      edgePath = undefined;
    }
  }
</script>

<path {id} marker-end={markerEnd} d={edgePath} {style} />
