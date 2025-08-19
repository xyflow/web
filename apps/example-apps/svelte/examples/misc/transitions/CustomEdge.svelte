<script lang="ts">
  import { fade } from 'svelte/transition';
  import { BaseEdge, type EdgeProps, getSmoothStepPath } from '@xyflow/svelte';

  let { ...props }: EdgeProps = $props();

  let [path] = $derived(getSmoothStepPath(props));
</script>

<!-- Just use "out:" so connecting edges looks better  -->
<g out:fade|global>
  <BaseEdge {path} />
</g>
