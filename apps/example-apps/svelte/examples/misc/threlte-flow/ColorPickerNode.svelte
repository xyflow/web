<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import { flowState, type NodeData } from './nodes-and-edges.svelte';

  let { data }: NodeProps<Node<NodeData>> = $props();
</script>

<NodeWrapper label={data.label}>
  <div class="flex items-center space-x-2 p-3">
    <input
      bind:value={flowState.color}
      class="nodrag w-6 h-6 rounded cursor-pointer"
      type="color"
    />
    <span class="font-mono text-xs">{flowState.color}</span>
  </div>
  <Handle
    type="source"
    position={Position.Right}
    class="w-[10px] h-[10px] border-none bg-gray-400"
  />
</NodeWrapper>
