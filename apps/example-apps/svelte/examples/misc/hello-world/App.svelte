<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    MiniMap,
  } from '@xyflow/svelte';
 
  import '@xyflow/svelte/dist/style.css'
 
  const nodes = writable([
    {
      id: '1',
      data: { label: 'Hello' },
      position: { x: 0, y: 0 }
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 100, y: 100 }
    }
  ]);
 
  const edges = writable([
    {
      id: '1-2',
      source: '1',
      target: '2',
    }
  ]);
</script>
 
<SvelteFlow {nodes} {edges} fitView>
  <Controls />
  <Background />
  <MiniMap />
</SvelteFlow>