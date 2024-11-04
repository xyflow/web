<script lang="ts">
  import { useConnection } from '@xyflow/svelte';

  const connection = useConnection();

  let path = '';

  $: {
    const { from, to } = $connection;
    path = `M${from.x},${from.y} C ${from.x} ${to.y} ${from.x} ${to.y} ${to.x},${to.y}`;
  }
</script>

{#if path}
  <path
    fill="none"
    stroke-width={1.5}
    class="animated"
    stroke={$connection.fromHandle?.id}
    d={path}
  />
  <circle
    cx={$connection.to.x}
    cy={$connection.to.y}
    fill="#fff"
    r={3}
    stroke={$connection.fromHandle?.id}
    stroke-width={1.5}
  />
{/if}
