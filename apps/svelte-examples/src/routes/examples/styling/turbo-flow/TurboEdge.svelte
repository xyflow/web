<script lang="ts">
  import { type EdgeProps, getBezierPath } from '@xyflow/svelte';

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

  $: {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;
    [edgePath] = getBezierPath({
      // we need this little hack in order to display the gradient for a straight line
      sourceX: xEqual ? sourceX + 0.0001 : sourceX,
      sourceY: yEqual ? sourceY + 0.0001 : sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition
    });
  }
</script>

<path {id} class="svelte-flow__edge-path" d={edgePath} marker-end={markerEnd} />
