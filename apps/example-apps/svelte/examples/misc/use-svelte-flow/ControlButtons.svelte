<script lang="ts">
  import { useSvelteFlow, useNodes, useViewport } from '@xyflow/svelte';

  const { zoomIn, zoomOut, setZoom, fitView, setCenter, setViewport } =
    $derived(useSvelteFlow()); // use $dervied when calling outside of the main Svelte Flow component

  const viewport = useViewport();
</script>

<div class="container">
  <button onclick={() => zoomIn()}>zoom in</button>
  <button onclick={() => zoomOut({ duration: 1000 })}
    >zoom out transition</button
  >
  <button onclick={() => setZoom(2)}>set zoom</button>
  <button onclick={() => fitView()}>fitView</button>
  <button onclick={() => setCenter(0, 0)}>setCenter 0, 0</button>
  <button onclick={() => setViewport({ x: 100, y: 100, zoom: 2 })}
    >setViewport</button
  >
  <div class="viewport">
    x: {viewport.current.x.toFixed(1)} y: {viewport.current.y.toFixed(1)} zoom: {viewport.current.zoom.toFixed(
      1,
    )}
  </div>
</div>

<style>
  .container {
    position: absolute;
    top: 15px;
    left: 15px;
    display: flex;
    align-items: center;
  }

  .viewport {
    margin-left: 10px;
    font-family: monospace;
  }

  button {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 12px;
    margin: 5px;
  }
</style>
