<script lang="ts">
  import { onMount } from 'svelte';
  import { useSvelteFlow, useNodes, useEdges, useStore } from '@xyflow/svelte';
  import getStroke from 'perfect-freehand';

  import { polylineIntersectsRectangle, pathsIntersect } from './utils';

  // Data structure for storing intersection detection information
  type IntersectionData = {
    id: string;
    type?: string;
    points?: [number, number][];
    rect?: { x: number; y: number; width: number; height: number };
  };

  // Type for tracking points with timestamps for the eraser trail effect
  type TimestampedPoint = {
    point: [number, number];
    timestamp: number;
  };

  // Threshold distance for detecting intersections between paths
  const intersectionThreshold = 5;

  // Distance between points to sample for edge intersection detection
  const sampleDistance = 150;

  // Configuration for the perfect-freehand stroke generation
  const pathOptions = {
    size: Math.max(10, intersectionThreshold),
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
    easing: (t: number) => t,
    start: {
      taper: true,
    },
    end: {
      taper: 0,
    },
  };

  // Get flow instance and state
  const { screenToFlowPosition, deleteElements, getInternalNode } = useSvelteFlow();
  const nodes = useNodes();
  const edges = useEdges();
  const store = $derived(useStore());

  // Canvas and rendering context references
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  // Cached intersection data for performance during dragging
  let nodeIntersectionData: IntersectionData[] = [];
  let edgeIntersectionData: IntersectionData[] = [];

  // Trail effect state
  let trailPoints: TimestampedPoint[] = [];
  let animationFrame = 0;
  let isDrawing = false;

  onMount(() => {
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });

  function handlePointerDown(e: PointerEvent) {
    const target = e.target as HTMLCanvasElement;
    target.setPointerCapture(e.pointerId);

    console.log('he');

    isDrawing = true;
    trailPoints = [
      {
        point: [e.pageX, e.pageY],
        timestamp: Date.now(),
      },
    ];

    // Pre-compute node intersection data
    nodeIntersectionData = [];
    for (const node of nodes.current) {
      const internalNode = getInternalNode(node.id);
      if (!internalNode) continue;

      const { x, y } = internalNode.internals.positionAbsolute;
      const { width = 0, height = 0 } = internalNode.measured;

      nodeIntersectionData.push({
        id: node.id,
        type: node.type,
        rect: { x, y, width, height },
      });
    }

    // Pre-compute edge intersection data
    edgeIntersectionData = [];
    for (const edge of edges.current) {
      const path = document.querySelector<SVGPathElement>(
        `.svelte-flow__edge[data-id="${edge.id}"] path`,
      );

      if (!path) continue;

      const length = path.getTotalLength();
      const steps = length / Math.max(10, length / sampleDistance);
      const points: [number, number][] = [];

      for (let i = 0; i <= length + steps; i += steps) {
        const point = path.getPointAtLength(i);
        points.push([point.x, point.y]);
      }

      edgeIntersectionData.push({
        id: edge.id,
        type: edge.type,
        points,
      });
    }

    ctx = canvas?.getContext('2d') || null;
    if (!ctx) return;
    ctx.lineWidth = 1;

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    animate();
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) return;

    trailPoints.push({
      point: [e.pageX, e.pageY],
      timestamp: Date.now(),
    });

    const points = trailPoints.map((tp) => tp.point);

    if (!ctx || points.length < 2) return;

    // Convert screen coordinates to flow coordinates
    const flowPoints = points.map(([x, y]) => {
      const flowPos = screenToFlowPosition({ x, y });
      return [flowPos.x, flowPos.y] as [number, number];
    });

    // Track which elements intersect with the eraser path
    const nodesToDelete = new Set<string>();
    const edgesToDelete = new Set<string>();

    // Check intersections with nodes
    for (const nodeData of nodeIntersectionData) {
      if (nodeData.rect && polylineIntersectsRectangle(flowPoints, nodeData.rect)) {
        nodesToDelete.add(nodeData.id);
      }
    }

    // Check intersections with edges
    for (const edgeData of edgeIntersectionData) {
      if (
        edgeData.points &&
        pathsIntersect(flowPoints, edgeData.points, intersectionThreshold)
      ) {
        edgesToDelete.add(edgeData.id);
      }
    }

    // Update nodes with toBeDeleted flag
    if (nodesToDelete.size > 0) {
      nodes.update((n) =>
        n.map((node) => {
          if (nodesToDelete.has(node.id)) {
            return {
              ...node,
              data: {
                ...node.data,
                toBeDeleted: true, // Flag for deletion
              },
            };
          }
          return node;
        }),
      );
    }

    // Update edges with toBeDeleted flag
    if (edgesToDelete.size > 0) {
      edges.update((e) =>
        e.map((edge) => {
          if (edgesToDelete.has(edge.id)) {
            return {
              ...edge,
              data: {
                ...edge.data,
                toBeDeleted: true, // Flag for deletion
              },
            };
          }
          return edge;
        }),
      );
    }
  }

  function handlePointerUp(e: PointerEvent) {
    isDrawing = false;
    const target = e.target as HTMLCanvasElement;
    target.releasePointerCapture(e.pointerId);

    // Delete marked elements
    const elementsToDelete = {
      nodes: nodes.current
        .filter((node) => node.data?.toBeDeleted)
        .map((node) => ({ id: node.id, type: 'node' as const })),
      edges: edges.current
        .filter((edge) => edge.data?.toBeDeleted)
        .map((edge) => ({ id: edge.id, type: 'edge' as const })),
    };

    deleteElements(elementsToDelete);
    trailPoints = [];
  }

  function drawTrail() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trailPoints.length < 2) return;

    const currentTime = Date.now();
    const maxAge = 300; // Trail fades over 300ms

    // Create gradient for fade effect
    const validPoints = trailPoints.filter((tp) => currentTime - tp.timestamp < maxAge);

    if (validPoints.length < 2) return;

    // Convert to canvas coordinates
    const canvasPoints = validPoints.map((tp) => {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return tp.point;
      return [tp.point[0] - rect.left, tp.point[1] - rect.top] as [number, number];
    });

    // Generate stroke path using perfect-freehand
    const stroke = getStroke(canvasPoints, pathOptions);

    if (stroke.length === 0) return;

    // Draw the stroke
    ctx.fillStyle = 'rgba(239, 68, 68, 0.8)'; // Red color
    ctx.beginPath();
    ctx.moveTo(stroke[0][0], stroke[0][1]);

    for (let i = 1; i < stroke.length; i++) {
      ctx.lineTo(stroke[i][0], stroke[i][1]);
    }

    ctx.closePath();
    ctx.fill();
  }

  function removeOldPoints() {
    const currentTime = Date.now();
    const maxAge = 300;
    trailPoints = trailPoints.filter((tp) => currentTime - tp.timestamp < maxAge);
  }

  function animate() {
    drawTrail();
    removeOldPoints();

    if (isDrawing || trailPoints.length > 0) {
      animationFrame = requestAnimationFrame(animate);
    }
  }
</script>

<canvas
  bind:this={canvas}
  width={store.width}
  height={store.height}
  class="nopan nodrag tool-overlay"
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
></canvas>

<style>
  .tool-overlay {
    position: absolute;
    top: 0;
    left: 0;
    touch-action: none;
    pointer-events: auto;
    z-index: 4;
  }
</style>
