<script lang="ts">
  import { useConnection } from '@xyflow/svelte';

  const connection = useConnection();

  let path = '';

  $: {
    const { sourceX, sourceY, targetX, targetY } = $connection;
    path = `M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`;
  }
</script>

{#if $connection.path}
  <path
    fill="none"
    stroke-width={1.5}
    class="animated"
    stroke={$connection.startHandle?.handleId}
    d={path}
  />
  <circle
    cx={$connection.targetX}
    cy={$connection.targetY}
    fill="#fff"
    r={3}
    stroke={$connection.startHandle?.handleId}
    stroke-width={1.5}
  />
{/if}
