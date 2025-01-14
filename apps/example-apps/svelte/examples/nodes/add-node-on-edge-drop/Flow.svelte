<script lang="ts">
  import {
    SvelteFlow,
    useSvelteFlow,
    Background,
    type Edge,
    type Node,
    type OnConnectEnd,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const initialNodes: Node[] = [
    {
      id: '0',
      type: 'input',
      data: { label: 'Node' },
      position: { x: 0, y: 50 },
    },
  ];

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>([]);

  let rect: DOMRectReadOnly = $state();
  let id = 1;
  const getId = () => `${id++}`;

  const { screenToFlowPosition } = $derived(useSvelteFlow());

  const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
    if (connectionState.isValid) return;

    const sourceNodeId = connectionState.fromNode?.id ?? '1';
    const id = getId();
    const { clientX, clientY } =
      'changedTouches' in event ? event.changedTouches[0] : event;

    const newNode: Node = {
      id,
      data: { label: `Node ${id}` },
      // project the screen coordinates to pane coordinates
      position: screenToFlowPosition({
        x: clientX,
        y: clientY,
      }),
      // set the origin of the new node so it is centered
      origin: [0.5, 0.0],
    };
    nodes = [...nodes, newNode];
    edges = [
      ...edges,
      {
        source: sourceNodeId,
        target: id,
        id: `${sourceNodeId}--${id}`,
      },
    ];
  };
</script>

<svelte:window />

<div class="wrapper" bind:contentRect={rect}>
  <SvelteFlow
    bind:nodes
    bind:edges
    fitView
    fitViewOptions={{ padding: 2 }}
    onconnectend={handleConnectEnd}
  >
    <Background />
  </SvelteFlow>
</div>

<style>
  :global(.svelte-flow .svelte-flow__handle) {
    width: 30px;
    height: 14px;
    border-radius: 3px;
    background-color: #784be8;
  }

  :global(.svelte-flow .svelte-flow__handle-top) {
    top: -10px;
  }

  :global(.svelte-flow .svelte-flow__handle-bottom) {
    bottom: -10px;
  }

  :global(.svelte-flow .svelte-flow__node) {
    height: 40px;
    width: 150px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-width: 2px;
    font-weight: 700;
  }

  :global(
      .svelte-flow .svelte-flow__edge path,
      .svelte-flow__connectionline path
    ) {
    stroke-width: 2;
  }

  .wrapper {
    height: 100vh;
    width: 100vw;
  }
</style>
