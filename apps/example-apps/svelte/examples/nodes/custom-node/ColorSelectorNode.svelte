<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import { bgColor } from './App.svelte';

  let { isConnectable }: NodeProps = $props();
</script>

<Handle
  type="target"
  position={Position.Left}
  style="background: #555;"
  {isConnectable}
/>
<div>
  Custom Color Picker Node: <strong>{bgColor.current}</strong>
</div>
<input class="nodrag" type="color" bind:value={bgColor.current} />
<Handle
  type="source"
  position={Position.Right}
  id="a"
  style="top: 10px; background: #555;"
  {isConnectable}
/>
<Handle
  type="source"
  position={Position.Right}
  id="b"
  style="bottom: 10px; top: auto; background: #555;"
  {isConnectable}
/>

<style>
  :global(.svelte-flow__node-selectorNode) {
    font-size: 12px;
    background: #eee;
    border: 1px solid #555;
    border-radius: 5px;
    text-align: center;
  }
</style>
