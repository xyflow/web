<script lang="ts">
  import { writable } from 'svelte/store';
  import {
    SvelteFlow,
    Background,
    Controls,
    MiniMap,
    type NodeTypes,
    type EdgeTypes,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  import { nodes, edges } from './nodes-and-edges';
  import CustomNode from './CustomNode.svelte';
  import AnnotationNode from './AnnotationNode.svelte';
  import ButtonEdge from './ButtonEdge.svelte';
  import CircleNode from './CircleNode.svelte';
  import ResizableNode from './ResizableNode.svelte';
  import ToolbarNode from './ToolbarNode.svelte';
  import TextNode from './TextNode.svelte';

  const nodeTypes: NodeTypes = {
    custom: CustomNode,
    annotation: AnnotationNode,
    circle: CircleNode,
    resizer: ResizableNode,
    tools: ToolbarNode,
    textinput: TextNode,
  };

  const edgeTypes: EdgeTypes = {
    button: ButtonEdge,
  };
</script>

<div style="height:100vh;" class="overview">
  <SvelteFlow {nodes} {edges} {nodeTypes} {edgeTypes} fitView>
    <Background patternColor="#aaa" gap={16} />
    <Controls />
    <MiniMap zoomable pannable height={120} />
  </SvelteFlow>
</div>
