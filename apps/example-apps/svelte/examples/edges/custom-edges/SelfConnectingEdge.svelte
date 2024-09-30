<script lang="ts">
  import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/svelte';

  type $$Props = EdgeProps;

  export let target: $$Props['target'];
  export let source: $$Props['source'];
  export let sourceX: $$Props['sourceX'];
  export let sourceY: $$Props['sourceY'];
  export let targetX: $$Props['targetX'];
  export let targetY: $$Props['targetY'];
  export let markerEnd: $$Props['markerEnd'] = undefined;

  let path: string;
  $: if (target === source) {
    const radiusX = (sourceX - targetX) * 0.6;
    const radiusY = 50;
    path = `M ${sourceX - 5} ${sourceY} A ${radiusX} ${radiusY} 0 1 0 ${targetX + 2} ${targetY}`;
  } else {
    [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });
  }
</script>

<BaseEdge {path} {markerEnd} />
