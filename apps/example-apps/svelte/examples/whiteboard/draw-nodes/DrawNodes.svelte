<script lang="ts">
  import { useNodes, useSvelteFlow, type XYPosition } from '@xyflow/svelte';

  const { screenToFlowPosition, getViewport } = useSvelteFlow();
  const nodes = useNodes();

  let start: XYPosition | null = $state(null);
  let end: XYPosition | null = $state(null);

  const colors = [
    '#D14D41',
    '#DA702C',
    '#D0A215',
    '#879A39',
    '#3AA99F',
    '#4385BE',
    '#8B7EC8',
    '#CE5D97',
  ];

  function getPosition(start: XYPosition, end: XYPosition) {
    return {
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
    };
  }

  function getDimensions(start: XYPosition, end: XYPosition, zoom: number = 1) {
    return {
      width: Math.abs(end.x - start.x) / zoom,
      height: Math.abs(end.y - start.y) / zoom,
    };
  }

  function getRandomColor(): string {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function handlePointerDown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
    start = { x: e.pageX, y: e.pageY };
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) return;
    end = { x: e.pageX, y: e.pageY };
  }

  function handlePointerUp() {
    if (!start || !end) return;

    const position = screenToFlowPosition(getPosition(start, end));
    const dimension = getDimensions(start, end, getViewport().zoom);

    nodes.update((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'box',
        position,
        ...dimension,
        data: {
          color: getRandomColor(),
        },
      },
    ]);

    start = null;
    end = null;
  }

  let rect = $derived(
    start && end
      ? {
          position: getPosition(start, end),
          dimension: getDimensions(start, end),
        }
      : null,
  );
</script>

<div
  class="draw-box nopan nodrag"
  role="button"
  tabindex="0"
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
>
  {#if rect}
    <div
      class="preview-box"
      style="
        width: {rect.dimension.width}px;
        height: {rect.dimension.height}px;
        transform: translate({rect.position.x}px, {rect.position.y}px);
      "
    ></div>
  {/if}
</div>

<style>
  .draw-box {
    pointer-events: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    height: 100%;
    width: 100%;
    transform-origin: top left;
    cursor: copy;
    touch-action: none;
  }

  .preview-box {
    position: absolute;
    z-index: 10;
    border: 2px dashed rgba(0, 89, 220, 0.8);
    pointer-events: none;
  }
</style>
