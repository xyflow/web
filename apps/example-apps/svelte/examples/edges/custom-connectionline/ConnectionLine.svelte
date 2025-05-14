<script lang="ts">
  import { useConnection } from '@xyflow/svelte';

  const connection = useConnection();

  let path: string | null = $derived.by(() => {
    if (connection.current.inProgress) {
      const { from, to } = connection.current;
      return `M${from.x},${from.y} C ${from.x} ${to.y} ${from.x} ${to.y} ${to.x},${to.y}`;
    }
    return null;
  });
</script>

{#if connection.current.inProgress}
  <path
    fill="none"
    stroke-width={1.5}
    class="animated"
    stroke={connection.current.fromHandle.id}
    d={path}
  />
  <circle
    cx={connection.current.to.x}
    cy={connection.current.to.y}
    fill="#fff"
    r={3}
    stroke={connection.current.fromHandle.id}
    stroke-width={1.5}
  />
{/if}
