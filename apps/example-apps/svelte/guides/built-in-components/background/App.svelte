<script lang="ts">
  import { SvelteFlow, Background, Panel, BackgroundVariant } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1',
      type: 'input',
      position: { x: 250, y: 25 },
      data: { label: 'Input' },
    },
    {
      id: '2',
      position: { x: 100, y: 125 },
      data: { label: 'Default' },
    },
    {
      id: '3',
      type: 'output',
      position: { x: 250, y: 250 },
      data: { label: 'Output' },
    },
  ]);

  let edges = $state.raw([
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ]);

  let variant: BackgroundVariant = $state(BackgroundVariant.Lines);
</script>

<SvelteFlow bind:nodes bind:edges fitView>
  <Background {variant} />
  <Panel position="top-left">
    <div>variant:</div>
    <button
      onclick={() => {
        variant = BackgroundVariant.Dots;
      }}>dots</button
    >
    <button
      onclick={() => {
        variant = BackgroundVariant.Lines;
      }}>lines</button
    >
    <button
      onclick={() => {
        variant = BackgroundVariant.Cross;
      }}>cross</button
    >
  </Panel>
</SvelteFlow>
