<script lang="ts">
  import { SvelteFlow, Background, type Node, type Edge } from '@xyflow/svelte';

  import ResizableNode from './ResizableNode.svelte';
  import CustomResizerNode from './CustomResizerNode.svelte';
  import ResizableNodeSelected from './ResizableNodeSelected.svelte';

  import '@xyflow/svelte/dist/style.css';

  const nodeStyle =
    'background: #fff; border: 1px solid black; border-radius: 15px; font-size: 12px;';

  const initialEdges: Edge[] = [];
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'ResizableNode',
      data: { label: 'NodeResizer' },
      position: { x: 0, y: 50 },
      style: nodeStyle,
    },
    {
      id: '2',
      type: 'ResizableNodeSelected',
      data: { label: 'NodeResizer when selected' },
      position: { x: 100, y: 300 },
      style: nodeStyle,
    },
    {
      id: '3',
      type: 'CustomResizerNode',
      data: { label: 'Custom Resize Icon' },
      position: { x: 150, y: 150 },
      style: nodeStyle + 'padding: 5px; height: 100px;',
    },
  ];

  let nodes = $state.raw<Node[]>(initialNodes);
  let edges = $state.raw<Edge[]>(initialEdges);

  const nodeTypes = {
    ResizableNode,
    CustomResizerNode,
    ResizableNodeSelected,
  };
</script>

<div style="height:100vh;">
  <SvelteFlow bind:nodes {nodeTypes} bind:edges fitView>
    <Background />
  </SvelteFlow>
</div>
