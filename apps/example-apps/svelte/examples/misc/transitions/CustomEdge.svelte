<script lang="ts">
  import { fade } from 'svelte/transition';
  import { SmoothStepEdge, type EdgeProps } from '@xyflow/svelte';

  let { ...props }: EdgeProps = $props();
</script>

<!-- Just use "out:" so connecting edges looks better  -->
<g out:fade|global>
  <SmoothStepEdge {...props} />
</g>
