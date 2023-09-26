<script lang="ts">
  // import { type Connec } from "@xyflow/svelte";

  // $$Props = ConnectionLineProps;

  export let fromX = 0;
  export let fromY = 0;
  export let toX = 0;
  export let toY = 0;

  const connectionHandleId = 'red';
</script>

<g>
  <path
    fill="none"
    stroke={connectionHandleId}
    stroke-width={1.5}
    class="animated"
    d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
  />
  <circle cx={toX} cy={toY} fill="#fff" r={3} stroke={connectionHandleId} stroke-width={1.5} />
</g>
