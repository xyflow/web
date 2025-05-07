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

<SvelteFlow bind:nodes bind:edges fitView onconnectend={handleConnectEnd}>
  <Background />
</SvelteFlow>
