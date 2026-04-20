<script lang="ts">
  import {
    SvelteFlow,
    Background,
    Panel,
    useConnection,
    useViewport,
    type NodeTypes,
    type Edge,
    type Node,
  } from '@xyflow/svelte';
  import { untrack } from 'svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';
  import AnnotationNode from './AnnotationNode.svelte';
  import NodeWrapper from './NodeWrapper.svelte';

  const nodeTypes: NodeTypes = {
    annotation: AnnotationNode,
  };

  const connectionAnnotation = {
    id: 'connection-annotation',
    type: 'annotation',
    selectable: false,
    data: {
      label: 'this is a "connection"',
      arrowStyle: 'arrow-top-left',
    },
    position: { x: 0, y: 0 },
  };

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const connection = useConnection();
  const viewport = useViewport();

  $effect(() => {
    if (connection.current.inProgress) {
      const { from, to } = connection.current;
      const nodePosition = { x: to.x, y: to.y };
      const hidden = Math.abs(to.y - from.y) < 25 && Math.abs(to.x - from.x) < 25;

      const untrackedNodes = untrack(() => nodes);
      const exists = untrackedNodes.some((n) => n.id === 'connection-annotation');

      nodes = exists
        ? untrackedNodes.map((node) =>
            node.id === 'connection-annotation'
              ? { ...node, position: nodePosition, hidden }
              : node,
          )
        : [...untrackedNodes, { ...connectionAnnotation, position: nodePosition, hidden }];
    } else {
      nodes = untrack(() => nodes).filter((node) => node.id !== 'connection-annotation');
    }
  });
</script>

<SvelteFlow bind:nodes bind:edges {nodeTypes} fitView colorMode="system">
  <Background />
  <Panel position="bottom-left">
    <NodeWrapper bottom={0} left={90} width={420}>
      <AnnotationNode
        data={{
          label:
            'The viewport is defined by x, y and zoom, which is the transform & scale applied to the flow.',
        }}
      />
    </NodeWrapper>
    <div class="viewport-logger">
      <div>x: {viewport.current.x.toFixed(2)}</div>
      <div>y: {viewport.current.y.toFixed(2)}</div>
      <div>zoom: {viewport.current.zoom.toFixed(2)}</div>
    </div>
  </Panel>
</SvelteFlow>
