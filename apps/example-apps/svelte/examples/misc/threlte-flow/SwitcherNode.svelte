<script lang="ts">
  import { Handle, type Node, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import { flowState, type NodeData } from './nodes-and-edges.svelte';

  let { data }: NodeProps<Node<NodeData>> = $props();

  const options = ['cube', 'pyramid'];
</script>

<NodeWrapper label={data.label}>
  <Handle
    type="source"
    position={Position.Right}
    class="w-[10px] h-[10px] border-none bg-gray-400"
  />
  <div class="flex flex-col nodrag p-3 gap-1.5">
    {#each options as option}
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          bind:group={flowState.shape}
          class="accent-[#ff4000]"
          type="radio"
          value={option}
          checked={flowState.shape === option}
        />
        <span class="text-xs text-gray-700 dark:text-gray-300">{option}</span>
      </label>
    {/each}
  </div>
</NodeWrapper>