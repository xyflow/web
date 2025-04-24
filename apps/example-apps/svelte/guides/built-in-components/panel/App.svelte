<script>
  import { SvelteFlow, Panel, Background } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
</script>

<SvelteFlow>
  <Panel position="top-left">top-left</Panel>
  <Panel position="top-center">top-center</Panel>
  <Panel position="top-right">top-right</Panel>
  <Panel position="bottom-left">bottom-left</Panel>
  <Panel position="bottom-center">bottom-center</Panel>
  <Panel position="bottom-right">bottom-right</Panel>
  <Panel position="center-left">center-left</Panel>
  <Panel position="center-right">center-right</Panel>
  <Background />
</SvelteFlow>
