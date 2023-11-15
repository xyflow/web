<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import { FileIcon, CloudIcon } from 'svelte-feather-icons';

  import FunctionIcon from './FunctionIcon.svelte';

  type $$Props = NodeProps;
  export let data: $$Props['data'];
</script>

<div class="cloud gradient">
  <div>
    <CloudIcon size="16" />
  </div>
</div>
<div class="wrapper gradient">
  <div class="inner">
    <div class="body">
      {#if data.icon}
        <div class="icon">
          {#if data.icon === 'function'}
            <FunctionIcon />
          {:else if data.icon === 'file'}
            <FileIcon size="16" />
          {/if}
        </div>
      {/if}
      <div>
        <div class="title">{data.title}</div>
        {#if data.subline}
          <div class="subline">{data.subline}</div>
        {/if}
      </div>
    </div>
    <Handle type="target" position={Position.Left} on:connect on:connectend on:connectstart />
    <Handle type="source" position={Position.Right} on:connect on:connectend on:connectstart />
  </div>
</div>
