<script lang="ts">
  import {
    Handle,
    Position,
    useViewport,
    type NodeProps,
    type Node,
  } from '@xyflow/svelte';

  type ZoomNode = Node<{
    zoomLevel: number;
    content: string;
  }>;

  let { data }: NodeProps<ZoomNode> = $props();

  const viewport = useViewport();

  let showContent = $derived(viewport.current.zoom > data.zoomLevel);
</script>

<div class="zoom-node">
  <Handle type="target" position={Position.Top} />
  {#if showContent}
    <p>{data.content}</p>
  {:else}
    <div class="placeholder">
      <div></div>
      <div></div>
      <div></div>
    </div>
  {/if}
  <Handle type="source" position={Position.Bottom} />
</div>

<style>
  .zoom-node {
    width: 150px;
  }

  .placeholder div {
    background: #eee;
    width: 100%;
    height: 10px;
    margin-bottom: 4px;
  }

  .placeholder div:last-child {
    margin-bottom: 0;
  }
</style>
