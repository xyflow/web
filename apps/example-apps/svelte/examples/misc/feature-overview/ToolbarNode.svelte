<script lang="ts">
  import {
    Handle,
    NodeToolbar,
    Position,
    type NodeProps,
  } from '@xyflow/svelte';

  let { data }: NodeProps = $props();

  const emojis = ['🚀', '🔥', '✨'];

  let selectedEmoji = $state(emojis[0]);
</script>

<NodeToolbar isVisible position={Position.Top}>
  {#each emojis as emoji (emoji)}
    <button onclick={() => (selectedEmoji = emoji)}>{emoji}</button>
  {/each}

  <!-- <button onclick={() => (emoji = '🔥')}>🔥</button>
  <button onclick={() => (emoji = '✨')}>✨</button> -->
</NodeToolbar>
<div style="padding: 10px 20px">
  <div>{selectedEmoji}</div>
</div>
<Handle type="target" position={Position.Left} />
<Handle type="source" position={Position.Right} />

<div>
  {data.label}
</div>
