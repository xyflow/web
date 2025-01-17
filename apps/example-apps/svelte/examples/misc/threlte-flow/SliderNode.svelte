<script lang="ts">
  import { Handle, type Node, Position, type NodeProps } from '@xyflow/svelte';
  import NodeWrapper from './NodeWrapper.svelte';
  import { flowState, type NodeData } from './nodes-and-edges.svelte';

  let { data }: NodeProps<Node<NodeData>> = $props();

  const min = 0;
  const max = 40;
</script>

<NodeWrapper label={data.label}>
  <Handle type="source" position={Position.Right} />
  <input
    class="nodrag accent-[#ff4000]"
    style="direction: rtl;"
    type="range"
    {min}
    {max}
    bind:value={flowState.zoom}
  />
</NodeWrapper>
