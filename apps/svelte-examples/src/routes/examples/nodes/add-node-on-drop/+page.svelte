<script lang="ts">
  import { SvelteFlow } from '@xyflow/svelte';
  import type { Edge, Node } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  import '@xyflow/svelte/dist/style.css';

  let rect;
  $: console.log(rect);

  let id = 1;
  const getId = () => `${id++}`;

  const initialNodes: Node[] = [
    {
      id: '0',
      type: 'input',
      data: { label: 'Node' },
      position: { x: 0, y: 50 }
    },
    {
      id: '1',
      type: 'output',
      data: { label: 'Node' },
      position: { x: 0, y: 50 }
    }
  ];

  const nodes = writable<Node[]>(initialNodes);
  const edges = writable<Edge[]>([]);

  let connectingNodeId = null;

  function handleConnectStart(x) {
    console.log(x);
  }

  function handleConnectEnd(x) {
    console.log(x);
  }

  //   const onConnectEnd = (event) => {
  //     const targetIsPane = event.target.classList.contains('svelte-flow__pane');

  //     if (targetIsPane) {
  //       // we need to remove the wrapper bounds, in order to get the correct position
  //       const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
  //       const id = getId();
  //       const newNode = {
  //         id,
  //         // we are removing the half of the node width (75) to center the new node
  //         position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
  //         data: { label: `Node ${id}` }
  //       };

  //       setNodes((nds) => nds.concat(newNode));
  //       setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
  //     }
  //   };
</script>

<svelte:window />

<div class="wrapper" bind:contentRect={rect}>
  <SvelteFlow
    {nodes}
    {edges}
    fitView
    on:connectstart={(x) => {
      console.log(x);
    }}
    on:connectend={(x) => {
      console.log(x);
    }}
    on:nodeclick={(x) => {
      console.log(x);
    }}
    on:connect={(x) => {
      console.log(x);
    }}
  ></SvelteFlow>
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

  :global(.svelte-flow .svelte-flow__edge path, .svelte-flow__connectionline path) {
    stroke-width: 2;
  }

  .wrapper {
    height: 100vh;
    width: 100vw;
  }
</style>
