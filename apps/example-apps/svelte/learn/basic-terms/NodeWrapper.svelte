<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    bottom,
    top,
    left,
    right,
    width,
    height,
  }: {
    children?: Snippet;
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    width?: number;
    height?: number;
  } = $props();

  const toPx = (value: number | undefined) => (value ? `${value}px` : value);
</script>

<div
  class="svelte-flow__node-annotation"
  style:position="absolute"
  style:font-size="12px"
  style:bottom={toPx(bottom)}
  style:left={toPx(left)}
  style:width={toPx(width)}
  style:height={toPx(height)}
  style:top={toPx(top)}
  style:right={toPx(right)}
>
  {@render children?.()}
</div>
