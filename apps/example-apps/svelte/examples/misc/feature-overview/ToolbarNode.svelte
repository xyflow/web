<script lang="ts">
  import { Handle, NodeToolbar, Position, type NodeProps } from '@xyflow/svelte';
  import { writable } from 'svelte/store';

  type $$Props = NodeProps;

  export let data: $$Props['data'];
  $$restProps;

  const emoji = writable('🚀');
</script>

<NodeToolbar isVisible position={Position.Top}>
  <button on:click={() => emoji.set('🚀')}>🚀</button>
  <button on:click={() => emoji.set('🔥')}>🔥</button>
  <button on:click={() => emoji.set('✨')}>✨</button>
</NodeToolbar>
<div style="padding: 10px 20px">
  <div>{$emoji}</div>
</div>
<Handle type="target" position={Position.Left} />
<Handle type="source" position={Position.Right} />

<div style="position: absolute; color: #555; bottom: -15px; fontSize: 8px;">{data.label}</div>
