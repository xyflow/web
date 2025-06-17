<script lang="ts">
  import { useSvelteFlow, useStore, useNodes } from '@xyflow/svelte';
  import { getSvgPathFromStroke } from './utils';

  type NodePoints = ([number, number] | [number, number, number])[];
  type NodePointObject = Record<string, NodePoints>;

  interface Props {
    partial: boolean;
  }

  let { partial }: Props = $props();

  const nodes = useNodes();
  const store = useStore();
  const { flowToScreenPosition, getInternalNode } = useSvelteFlow();

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  let nodePoints: NodePointObject = {};
  let points: [number, number][] = [];

  function handlePointerDown(e: PointerEvent) {
    const target = e.target as HTMLCanvasElement;
    target.setPointerCapture(e.pointerId);

    const nextPoints = [...points, [e.pageX, e.pageY]] satisfies [number, number][];
    points = nextPoints;

    nodePoints = {};
    for (const node of nodes.current) {
      const internalNode = getInternalNode(node.id);
      if (!internalNode) continue;

      const { x, y } = internalNode.internals.positionAbsolute;
      const { width = 0, height = 0 } = internalNode.measured;
      const nodeCorners = [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
      ] satisfies NodePoints;
      nodePoints[node.id] = nodeCorners;
    }

    ctx = canvas?.getContext('2d') || null;
    if (!ctx) return;
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(0, 89, 220, 0.08)';
    ctx.strokeStyle = 'rgba(0, 89, 220, 0.8)';
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) return;
    const nextPoints = [...points, [e.pageX, e.pageY]] satisfies [number, number][];
    points = nextPoints;

    const path = new Path2D(getSvgPathFromStroke(nextPoints));

    if (!ctx) return;
    ctx.clearRect(0, 0, store.width, store.height);
    ctx.fill(path);
    ctx.stroke(path);

    const nodesToSelect = new Set<string>();

    for (const [nodeId, nodeCorners] of Object.entries(nodePoints)) {
      if (partial) {
        // Partial selection: select node if any point is in the path
        for (const point of nodeCorners) {
          const { x, y } = flowToScreenPosition({ x: point[0], y: point[1] });
          if (ctx.isPointInPath(path, x, y)) {
            nodesToSelect.add(nodeId);
            break;
          }
        }
      } else {
        // Full selection: select node only if all points are in the path
        let allPointsInPath = true;
        for (const point of nodeCorners) {
          const { x, y } = flowToScreenPosition({ x: point[0], y: point[1] });
          if (!ctx.isPointInPath(path, x, y)) {
            allPointsInPath = false;
            break;
          }
        }
        if (allPointsInPath) {
          nodesToSelect.add(nodeId);
        }
      }
    }

    nodes.update((nodes) =>
      nodes.map((node) => ({
        ...node,
        selected: nodesToSelect.has(node.id),
      })),
    );
  }

  function handlePointerUp(e: PointerEvent) {
    const target = e.target as HTMLCanvasElement;
    target.releasePointerCapture(e.pointerId);
    points = [];
    if (ctx) {
      ctx.clearRect(0, 0, store.width, store.height);
    }
  }
</script>

<canvas
  bind:this={canvas}
  width={store.width}
  height={store.height}
  class="lasso"
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
></canvas>

<style>
  .lasso {
    position: absolute;
    z-index: 5;
    height: 100%;
    width: 100%;
    touch-action: none;
  }
</style>
