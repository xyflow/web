<script lang="ts">
  import { writable } from 'svelte/store';
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: Node[] = [
    {
      id: '1',
      data: { label: 'choose' },
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: '2',
      data: { label: 'your' },
      position: {
        x: 100,
        y: 100
      }
    },
    {
      id: '3',
      data: { label: 'desired' },
      position: {
        x: 0,
        y: 200
      }
    },
    {
      id: '4',
      data: { label: 'edge' },
      position: {
        x: 100,
        y: 300
      }
    },
    {
      id: '5',
      data: { label: 'type' },
      position: {
        x: 0,
        y: 400
      }
    }
  ];

  const initialEdges: Edge[] = [
    {
      type: 'straight',
      source: '1',
      target: '2',
      id: '1',
      label: 'straight'
    },
    {
      type: 'step',
      source: '2',
      target: '3',
      id: '2',
      label: 'step'
    },
    {
      type: 'smoothstep',
      source: '3',
      target: '4',
      id: '3',
      label: 'smoothstep'
    },
    {
      type: 'bezier',
      source: '4',
      target: '5',
      id: '4',
      label: 'bezier'
    }
  ];

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>(initialEdges);
</script>

<div style="height:100vh;">
  <SvelteFlow {nodes} {edges} fitView>
    <Background />
  </SvelteFlow>
</div>
