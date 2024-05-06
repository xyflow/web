<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';
  import type { AnnotationNode } from './types';

  type $$Props = NodeProps<AnnotationNode>;
  $$restProps;

  export let data: $$Props['data'];
</script>

<div style="padding: 10px; display: flex">
  <div style="marginRight: 4px">{data.level}.</div>
  <div>{data.label}</div>
</div>
{#if data.arrowStyle}
  <div class="arrow" style={data.arrowStyle}>⤹</div>
{/if}
