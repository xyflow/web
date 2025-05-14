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
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { initialNodes, initialEdges } from './nodes-and-edges';

  import AnnotationNode from './AnnotationNode.svelte';
  import ButtonEdge from './ButtonEdge.svelte';
  import CircleNode from './CircleNode.svelte';
  import ResizerNode from './ResizerNode.svelte';
  import ToolbarNode from './ToolbarNode.svelte';
  import TextNode from './TextNode.svelte';

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
</script>

<SvelteFlow
  class="overview"
  bind:nodes
  bind:edges
  {nodeTypes}
  {edgeTypes}
  fitView
>
  <Background patternColor="#aaa" gap={16} />
  <Controls />
  <MiniMap zoomable pannable height={120} nodeClass={(node) => node.type} />
</SvelteFlow>
