<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    type Node,
    type Edge
  } from '@xyflow/svelte';

  import DragHandleNode from './DragHandleNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeTypes = {
    dragHandleNode: DragHandleNode
  };

  const nodes = writable<Node[]>([
    {
      id: '2',
      type: 'dragHandleNode',
      dragHandle: '.custom-drag-handle',
      style: 'border: 1px solid #ddd; padding: 20px 40px',
      position: { x: 200, y: 200 },
      data: {
        label: 'Drag Handle'
      }
    }
  ]);

  const edges = writable<Edge[]>([]);
</script>

<div style="height:100vh">
  <SvelteFlow {nodes} {edges} {nodeTypes} fitView>
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
  </SvelteFlow>
</div>
