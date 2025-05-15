<script lang="ts">
  import {
    SvelteFlow,
    Background,
    Controls,
    MiniMap,
    type NodeTypes,
    type EdgeTypes,
    type Edge,
    type Node,
    useConnection,
    useViewport,
    Panel,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import AnnotationNode from './AnnotationNode.svelte';
  import ButtonEdge from './ButtonEdge.svelte';
  import CircleNode from './CircleNode.svelte';
  import ResizerNode from './ResizerNode.svelte';
  import ToolbarNode from './ToolbarNode.svelte';
  import TextNode from './TextNode.svelte';
  import { untrack } from 'svelte';
  import NodeWrapper from './NodeWrapper.svelte';

  const connectionAnnotation = {
    id: 'connection-annotation',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'this is a "connection"',
      arrowStyle:
        'right: 0; bottom: 0; transform: translate(-120px, -50px) rotate(-70deg) scale(-1, 1);',
    },
    position: { x: 0, y: 0 },
  };

  const nodeTypes: NodeTypes = {
    annotation: AnnotationNode,
    tools: ToolbarNode,
    circle: CircleNode,
    resizer: ResizerNode,
    textinput: TextNode,
  };

  const edgeTypes: EdgeTypes = {
    button: ButtonEdge,
  };

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const connection = useConnection();

  const viewport = useViewport();

  $effect(() => {
    if (connection.current.inProgress) {
      let untrackedNodes = untrack(() => nodes);
      const nodeFound =
        untrackedNodes.findIndex((node) => node.id === 'connection-annotation') !== -1;
      const { from, to } = connection.current;
      const nodePosition = {
        x: to.x - 150,
        y: to.y - 25,
      };
      nodes = nodeFound
        ? untrackedNodes.map((node) => {
            if (node.id === 'connection-annotation') {
              return {
                ...connectionAnnotation,
                position: nodePosition,
                hidden: Math.abs(to.y - from.y) < 25 && Math.abs(to.x - from.x) < 25,
              };
            }
            return node;
          })
        : [
            ...nodes,
            {
              ...connectionAnnotation,
              position: nodePosition,
            },
          ];
    } else {
      // delete the connection-annotaion node
      nodes = untrack(() => nodes).filter((node) => node.id !== 'connection-annotation');
    }
  });
</script>

<SvelteFlow
  class="overview"
  bind:nodes
  bind:edges
  {nodeTypes}
  {edgeTypes}
  fitView
  fitViewOptions={{ padding: { x: '30px', y: '30px', bottom: '35%' } }}
>
  <Background patternColor="#aaa" gap={16} />
  <Panel position="bottom-left">
    <div style:font-family="monospace">
      <div>x: {viewport.current.x.toFixed(2)}</div>
      <div>y: {viewport.current.y.toFixed(2)}</div>
      <div>zoom: {viewport.current.zoom.toFixed(2)}</div>
    </div>
  </Panel>
  <NodeWrapper bottom={15} left={120} width={420}>
    <AnnotationNode
      data={{
        label:
          'the viewport is defined by x, y and zoom, which is the transform & scale applied to the flow',
        arrowStyle:
          'left: 0; bottom: 0; transform: translate(-25px, -15px) rotate(70deg) scale(1, 1);',
      }}
    />
  </NodeWrapper>
</SvelteFlow>
