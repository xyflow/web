<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import type { Writable } from 'svelte/store';

  type $$Props = NodeProps;

  export let data: { color: Writable<string> };

  const { color } = data;
</script>

<div class="colorpicker">
  <Handle type="target" position={Position.Left} />
  <div>
    color: <strong>{$color}</strong>
  </div>
  <input
    class="nodrag"
    type="color"
    on:input={(evt) => data.color.set(evt.target?.value)}
    value={$color}
  />
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
