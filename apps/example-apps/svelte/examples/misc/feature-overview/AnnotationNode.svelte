<script module>
  import type { Node, NodeProps } from '@xyflow/svelte';

  export type AnnotationNode = Node<{
    label: string;
    level: number;
    arrowStyle?: string;
  }>;
</script>

<script lang="ts">
  let { data }: NodeProps<AnnotationNode> = $props();
</script>

<div style="padding: 10px; display: flex">
  <div style="marginRight: 4px">{data.level}.</div>
  <div>{data.label}</div>
</div>
{#if data.arrowStyle}
  <div class="arrow" style={data.arrowStyle}>⤹</div>
{/if}
