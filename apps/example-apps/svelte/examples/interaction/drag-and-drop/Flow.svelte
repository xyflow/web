<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    MiniMap,
    useSvelteFlow,
    type Node,
  } from '@xyflow/svelte';

  import { useDnD } from './DnDProvider.svelte';
  import Sidebar from './Sidebar.svelte';

  import '@xyflow/svelte/dist/style.css';

  let nodes = $state.raw([
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 150, y: 5 },
    },
    {
      id: '2',
      type: 'default',
      data: { label: 'Default Node' },
      position: { x: 0, y: 150 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 300, y: 150 },
    },
  ]);

  let edges = $state.raw([
    {
      id: '1-2',
      type: 'default',
      source: '1',
      target: '2',
    },
    {
      id: '1-3',
      type: 'smoothstep',
      source: '1',
      target: '3',
    },
  ]);

  const { screenToFlowPosition } = useSvelteFlow();

  const type = useDnD();

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (!type.current) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${Math.random()}`,
      type: type.current,
      position,
      data: { label: `${type.current} node` },
      origin: [0.5, 0.0],
    } satisfies Node;

    nodes = [...nodes, newNode];
  };
</script>

<main>
  <SvelteFlow bind:nodes bind:edges fitView ondragover={onDragOver} ondrop={onDrop}>
    <Controls />
    <Background variant={BackgroundVariant.Dots} />
    <MiniMap />
  </SvelteFlow>
  <Sidebar />
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
