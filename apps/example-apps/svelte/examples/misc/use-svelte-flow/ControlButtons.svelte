<script lang="ts">
  import { useSvelteFlow, useViewport, Panel } from '@xyflow/svelte';

  const { zoomIn, zoomOut, setZoom, fitView, setCenter, setViewport } = useSvelteFlow();

  const viewport = useViewport();
</script>

<Panel position="top-left" class="button-panel">
  <div class="button-container">
    <button onclick={() => zoomIn()}>zoom in</button>
    <button onclick={() => zoomOut({ duration: 1000 })}>zoom out transition</button>
    <button onclick={() => setZoom(2)}>set zoom</button>
    <button onclick={() => fitView()}>fitView</button>
    <button onclick={() => setCenter(0, 0)}>setCenter 0, 0</button>
    <button onclick={() => setViewport({ x: 100, y: 100, zoom: 2 })}>setViewport</button>
    <div class="viewport">
      x: {viewport.current.x.toFixed(1)} y: {viewport.current.y.toFixed(1)} zoom: {viewport.current.zoom.toFixed(
        1,
      )}
    </div>
  </div>
</Panel>

<style>
  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    /* Wrap the buttons to the next line  */
    flex-wrap: wrap;
    gap: 2px;
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
