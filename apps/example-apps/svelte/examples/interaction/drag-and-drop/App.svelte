<script>
  import { SvelteFlowProvider } from '@xyflow/svelte';

  import Flow from './Flow.svelte';
  import DnDProvider from './DnDProvider.svelte';
</script>

<SvelteFlowProvider>
  <DnDProvider>
    <Flow />
  </DnDProvider>
</SvelteFlowProvider>
