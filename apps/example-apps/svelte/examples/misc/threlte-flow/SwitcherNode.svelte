<script lang="ts">
  import { Handle, type Node, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import { flowState, type NodeData } from './nodes-and-edges.svelte';

  let { data }: NodeProps<Node<NodeData>> = $props();

  const options = ['cube', 'pyramid'];
</script>

<NodeWrapper label={data.label}>
  <Handle type="source" position={Position.Right} />
  <div class="flex flex-col nodrag">
    {#each options as option}
      <label class="flex">
        <input
          bind:group={flowState.shape}
          class="accent-[#ff4000]"
          type="radio"
          value={option}
          checked={flowState.shape === option}
        />
        <span class="ml-2">{option}</span>
      </label>
    {/each}
  </div>
</NodeWrapper>
