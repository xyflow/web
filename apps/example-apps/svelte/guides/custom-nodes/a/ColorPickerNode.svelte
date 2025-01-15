<script lang="ts">
  import { Handle, Node, Position, type NodeProps } from '@xyflow/svelte';
  import { SharedState } from './App.svelte';

  let { data }: NodeProps<Node<{ sharedState: SharedState }>> = $props();
</script>

<div class="colorpicker">
  <Handle type="target" position={Position.Left} />
  <div>
    color: <strong>{data.sharedState.color}</strong>
  </div>
  <input class="nodrag" type="color" bind:value={data.sharedState.color} />
  <Handle type="source" position={Position.Right} />
</div>

<style>
  .colorpicker {
    padding: 1rem;
    background: #eee;
    border-radius: 0.125rem;
    font-size: 0.7rem;
  }
</style>
