<script module>
  export type ErasableEdgeType = Edge<
    {
      toBeDeleted?: boolean;
    },
    'erasable-edge'
  >;
</script>

<script lang="ts">
  import {
    BaseEdge,
    type Edge,
    type EdgeProps,
    getSmoothStepPath,
    useInternalNode,
  } from '@xyflow/svelte';

  let {
    id,
    source,
    sourceX,
    sourceY,
    target,
    targetX,
    targetY,
    data,
  }: EdgeProps<ErasableEdgeType> = $props();

  const [edgePath] = $derived(getSmoothStepPath({ sourceX, sourceY, targetX, targetY }));

  const sourceNode = $derived(useInternalNode(source));
  const targetNode = $derived(useInternalNode(target));

  const toBeDeleted = $derived(
    data?.toBeDeleted ||
      sourceNode.current?.data.toBeDeleted ||
      targetNode.current?.data.toBeDeleted,
  );
</script>

<BaseEdge {id} path={edgePath} style="opacity: {toBeDeleted ? 0.3 : 1}" />
