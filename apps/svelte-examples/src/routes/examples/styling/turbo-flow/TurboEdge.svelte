<script lang="ts">
  import { useNodes, type EdgeProps } from '@xyflow/svelte';
  import { getBezierPath } from '@xyflow/system';

  type $$Props = EdgeProps;

  export let id: $$Props['id'];
  export let markerEnd: $$Props['markerEnd'];
  export let sourceX: $$Props['sourceX'];
  export let sourceY: $$Props['sourceY'];
  export let sourcePosition: $$Props['sourcePosition'];
  export let targetX: $$Props['targetX'];
  export let targetY: $$Props['targetY'];
  export let targetPosition: $$Props['targetPosition'];

  let edgePath: string | undefined;
  let sourceNode: Node | undefined;
  let targetNode: Node | undefined;

  const nodes = useNodes();

  $: {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;
    edgePath = getBezierPath({
      // we need this little hack in order to display the gradient for a straight line
      sourceX: xEqual ? sourceX + 0.0001 : sourceX,
      sourceY: yEqual ? sourceY + 0.0001 : sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition
    })[0];
  }
</script>

<path {id} class="svelte-flow__edge-path" d={edgePath} marker-end={markerEnd} />
