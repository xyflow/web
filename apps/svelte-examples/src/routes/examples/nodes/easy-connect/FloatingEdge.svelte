<svelte:options immutable />

<script lang="ts">
  import type { EdgeProps, Node } from '@xyflow/svelte';
  import { getStraightPath, useNodes } from '@xyflow/svelte';
  import { getEdgeParams } from './utils';

  type $$Props = EdgeProps;

  export let source: EdgeProps['source'];
  export let target: EdgeProps['target'];
  export let markerEnd: EdgeProps['markerEnd'] = undefined;
  export let style: EdgeProps['style'] = undefined;
  export let id: EdgeProps['id'];

  const nodes = useNodes();

  let sourceNode: Node | undefined;
  let targetNode: Node | undefined;

  let edgePath: string | undefined;

  $: {
    $nodes.forEach((node) => {
      if (node.id === source) sourceNode = node;
      if (node.id === target) targetNode = node;
    });
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
