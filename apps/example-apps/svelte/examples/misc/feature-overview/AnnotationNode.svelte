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

<div class="annotation-content">
  <div class="annotation-level">{data.level}.</div>
  <div>{data.label}</div>
</div>
{#if data.arrowStyle}
  <div class="annotation-arrow" style={data.arrowStyle}>⤹</div>
{/if}
