<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Controls, Background, type Node, type Edge } from '@xyflow/svelte';

  import DragHandleNode from './DragHandleNode.svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeTypes = {
    dragHandleNode: DragHandleNode
  };

  const nodes = writable<Node[]>([
    {
      id: '2',
      type: 'dragHandleNode',

      // Specify the custom class acting as a drag handle
      dragHandle: '.custom-drag-handle',

      style: 'border: 1px solid #ddd; padding: 20px 40px; background: white;',
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
    <Background />
  </SvelteFlow>
</div>
