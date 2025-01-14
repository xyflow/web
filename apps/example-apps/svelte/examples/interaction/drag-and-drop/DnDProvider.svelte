<script module>
  import { getContext } from 'svelte';

  export const useDnD = () => {
    return getContext('dnd') as { current: string | null };
  };
</script>

<script lang="ts">
  import { onDestroy, setContext, type Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  let dndType = $state(null);

  setContext('dnd', {
    set current(value) {
      dndType = value;
    },
    get current() {
      return dndType;
    },
  });

  onDestroy(() => {
    dndType.set(null);
  });
</script>

{@render children()}
