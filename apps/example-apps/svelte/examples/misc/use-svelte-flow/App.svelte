<script lang="ts">
  import { SvelteFlowProvider } from '@xyflow/svelte';

  import Flow from './Flow.svelte';
  import ControlButtons from './ControlButtons.svelte';
</script>

<SvelteFlowProvider>
  <Flow />
  <ControlButtons />
</SvelteFlowProvider>
