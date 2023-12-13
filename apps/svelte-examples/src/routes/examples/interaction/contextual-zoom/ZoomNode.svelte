<script lang="ts">
  import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';

  type $$Props = NodeProps;
  export let data: $$Props['data'];

  const { viewport } = useSvelteFlow();

  let showContent = false;
  $: {
    if ($viewport.zoom > data.zoomLevel) {
      showContent = true;
    } else {
      showContent = false;
    }
  }
</script>

<div class="zoom-node">
  <Handle type="target" position={Position.Top} />
  {#if showContent}
    <p>{data.content}</p>
  {:else}
    <div class="placeholder">
      <div />
      <div />
      <div />
    </div>
  {/if}
  <Handle type="source" position={Position.Bottom} />
</div>

<style>
  .zoom-node {
    font-size: 12px;
    background: #fff;
    border: 1px solid #555;
    border-radius: 5px;
    text-align: center;
    width: 150px;
    padding: 10px;
    line-height: 1.2;
  }

  .zoom-node img {
    pointer-events: none;
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
