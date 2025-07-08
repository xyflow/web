<script module>
  export type UppercaseNodeType = Node<{ text: string }, 'uppercase'>;
</script>

<script lang="ts">
  import {
    Handle,
    Position,
    useNodeConnections,
    useNodesData,
    useSvelteFlow,
    type NodeProps,
    type Node,
  } from '@xyflow/svelte';
  import { isTextNode } from './App.svelte';
  import { untrack } from 'svelte';

  let { id, data }: NodeProps<Node<{ text: string }>> = $props();

  const { updateNodeData } = useSvelteFlow();

  const connections = useNodeConnections({
    handleType: 'target',
  });

  let nodeData = $derived(useNodesData(connections.current[0]?.source));
  let textNodeData = $derived(
    isTextNode(nodeData.current) ? nodeData.current.data : null,
  );

  $effect.pre(() => {
    const input = textNodeData?.text.toUpperCase() ?? '';

    if (input === untrack(() => data.text)) return;
    updateNodeData(id, {
      text: input,
    });
  });
</script>

<div class="custom">
  <Handle
    type="target"
    position={Position.Left}
    isConnectable={connections.current.length === 0}
  />
  <div>uppercase transform</div>
  <Handle type="source" position={Position.Right} />
</div>
