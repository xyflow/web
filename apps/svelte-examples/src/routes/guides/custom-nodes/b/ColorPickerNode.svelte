<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;

  export let data: { color: Writable<string> };

  const { color } = data;
</script>

<div class="colorpicker">
  <Handle type="target" position={Position.Left} />
  <div>
    mix color: <strong>{$color}</strong>
  </div>
  <input
    class="nodrag"
    type="color"
    on:input={(evt) => data.color.set(evt.target?.value)}
    value={$color}
  />
  <Handle type="source" position={Position.Right} on:connect on:connectend on:connectstart />
</div>

<style>
  .colorpicker {
    padding: 1rem;
    background: #eee;
    border-radius: 0.125rem;
    font-size: 0.7rem;
  }
</style>
