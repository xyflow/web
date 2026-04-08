<script>
  import { SvelteFlow, Background, Controls } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
</script>

<div style:width="100vw" style:height="100vh">
  <SvelteFlow colorMode="system">
    <Background />
    <Controls />
  </SvelteFlow>
</div>
