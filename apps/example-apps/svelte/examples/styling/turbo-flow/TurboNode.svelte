<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  import { FileIcon, CloudIcon } from 'svelte-feather-icons';

  import FunctionIcon from './FunctionIcon.svelte';

  let { data }: NodeProps = $props();
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
        {#if data.subtitle}
          <div class="subtitle">{data.subtitle}</div>
        {/if}
      </div>
    </div>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
  </div>
</div>
