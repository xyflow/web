import getStroke from 'perfect-freehand';
import { useRef, useEffect, type PointerEvent } from 'react';
import {
  useEdges,
  useNodes,
  useReactFlow,
  useStore,
  useViewport,
  ViewportPortal,
  type ReactFlowState,
} from '@xyflow/react';

import { polylineIntersectsRectangle, pathsIntersect } from './utils';
import { ErasableNodeType } from './ErasableNode';
import { ErasableEdgeType } from './ErasableEdge';

// Type definitions for path coordinates
// - can be 2D or 3D points (with pressure) for freehand strokes for instance
type PathPoints = ([number, number] | [number, number, number])[];

// Data structure for storing intersection detection information
type IntersectionData = {
  id: string; // Unique identifier for the element
  type?: string; // Type of node/edge (e.g., 'freehand', 'box', 'text')
  points?: PathPoints; // Path points for freehand elements
  rect?: { x: number; y: number; width: number; height: number }; // Bounding box for rectangular elements
};

// Type for tracking points with timestamps for the eraser trail effect
type TimestampedPoint = {
  point: [number, number]; // Screen coordinates [x, y]
  timestamp: number; // When this point was recorded
};

// Threshold distance for detecting intersections between paths
const intersectionThreshold = 5;

// Distance between points to sample for edge intersection detection
// This is a trade-off between performance and accuracy
const sampleDistance = 150;

// Configuration for the perfect-freehand stroke generation
const pathOptions = {
  size: Math.max(10, intersectionThreshold), // Stroke width
  thinning: 0.5, // How much the stroke tapers
  smoothing: 0.5, // How much to smooth the path
  streamline: 0.5, // How much to simplify the path
  easing: (t: number) => t, // Linear easing function
  start: {
    taper: true, // Taper the start of the stroke
  },
  end: {
    taper: 0, // Don't taper the end of the stroke
  },
};

// Selector to extract viewport dimensions from React Flow store
const storeSelector = (state: ReactFlowState) => ({
  width: state.width,
  height: state.height,
});

/**
 * Eraser component that provides an overlay canvas for erasing nodes and edges
 * in a React Flow diagram. Draws a visual trail and detects intersections with
 * flow elements to mark them for deletion.
 */
export function Eraser() {
  // Get viewport dimensions from React Flow store
  const { width, height } = useStore(storeSelector);

  // React Flow hooks for interacting with the flow state
  const { screenToFlowPosition, deleteElements, getInternalNode, setNodes, setEdges } =
    useReactFlow<ErasableNodeType, ErasableEdgeType>();
  const nodes = useNodes<ErasableNodeType>();
  const edges = useEdges<ErasableEdgeType>();
  const viewport = useViewport();

  // Canvas and rendering context references
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | undefined | null>();

  // Cached intersection data for performance during dragging
  const nodeIntersectionData = useRef<IntersectionData[]>([]);
  const edgeIntersectionData = useRef<IntersectionData[]>([]);

  // Trail effect state
  const trailPoints = useRef<TimestampedPoint[]>([]); // Points with timestamps for fade effect
  const animationFrame = useRef<number>(0); // Animation frame ID for cleanup
  const isDrawing = useRef<boolean>(false); // Whether user is currently drawing

  // Cleanup animation frame when component unmounts
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  /**
   * Handles the start of an eraser stroke
   * - Captures pointer events
   * - Initializes trail tracking
   * - Pre-computes intersection data for all nodes and edges
   * - Sets up canvas context and starts animation loop
   */
  function handlePointerDown(e: PointerEvent<HTMLCanvasElement>) {
    // Capture pointer to ensure we receive move/up events even if cursor leaves canvas
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);

    // Initialize trail with the starting point
    isDrawing.current = true;
    trailPoints.current = [
      {
        point: [e.pageX, e.pageY], // Use page coordinates for screen-space rendering
        timestamp: Date.now(),
      },
    ];

    // Pre-compute node intersection data for performance during drag
    nodeIntersectionData.current = [];
    for (const node of nodes) {
      const internalNode = getInternalNode(node.id);
      if (!internalNode) continue;

      // Extract position and dimensions from React Flow's internal node data
      const { x, y } = internalNode.internals.positionAbsolute;
      const { width = 0, height = 0 } = internalNode.measured;

      nodeIntersectionData.current.push({
        id: node.id,
        type: node.type,
        rect: { x, y, width, height }, // Store bounding rectangle for intersection testing
      });
    }

    // Pre-compute edge intersection data by sampling points along edge paths
    edgeIntersectionData.current = [];

    for (const edge of edges) {
      // Find the SVG path element for this edge in the DOM
      const path = document.querySelector<SVGPathElement>(
        `.react-flow__edge[data-id="${edge.id}"] path`,
      );

      if (!path) continue;

      // Sample points along the edge path for intersection detection
      const length = path.getTotalLength();
      const steps = length / Math.max(10, length / sampleDistance); // Adaptive step size
      const points: [number, number][] = [];

      for (let i = 0; i <= length + steps; i += steps) {
        const point = path.getPointAtLength(i);
        points.push([point.x, point.y]);
      }

      edgeIntersectionData.current.push({
        id: edge.id,
        type: edge.type,
        points, // Store sampled points for intersection testing
      });
    }

    // Initialize canvas context for drawing the eraser trail
    ctx.current = canvas.current?.getContext('2d');
    if (!ctx.current) return;
    ctx.current.lineWidth = 1;

    // Start the animation loop for continuous trail rendering
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animate();
  }

  /**
   * Handles pointer movement during eraser stroke
   * - Adds points to the trail
   * - Performs intersection detection with nodes and edges
   * - Marks intersecting elements for deletion
   */
  function handlePointerMove(e: PointerEvent) {
    // Only process if left mouse button is held down
    if (e.buttons !== 1) return;

    // Add new point to trail with current timestamp
    trailPoints.current.push({
      point: [e.pageX, e.pageY],
      timestamp: Date.now(),
    });

    // Extract just the coordinate points for intersection testing
    const points = trailPoints.current.map((tp) => tp.point);

    if (!ctx.current || points.length < 2) return;

    // Convert screen coordinates to flow coordinates for accurate intersection testing
    const flowPoints = points.map(([x, y]) => {
      const flowPos = screenToFlowPosition({ x, y });
      return [flowPos.x, flowPos.y] as [number, number];
    });

    // Track which elements intersect with the eraser path
    const nodesToDelete = new Set<string>();
    const edgesToDelete = new Set<string>();

    // Test intersection with each node using appropriate method based on node type
    for (const nodeInfo of nodeIntersectionData.current) {
      let intersects = false;

      if (nodeInfo.type === 'freehand' && nodeInfo.points) {
        // For freehand nodes: check if the eraser path intersects the drawn path
        intersects = pathsIntersect(
          flowPoints,
          nodeInfo.points as [number, number][],
          intersectionThreshold,
        );
      } else if (nodeInfo.rect) {
        // For rectangular nodes: check if eraser line intersects the bounding box
        intersects = polylineIntersectsRectangle(flowPoints, nodeInfo.rect);
      }

      if (intersects) {
        nodesToDelete.add(nodeInfo.id);
      }
    }

    // Test intersection with each edge by checking path-to-path intersection
    for (const edgeInfo of edgeIntersectionData.current) {
      let intersects = false;

      if (edgeInfo.points) {
        intersects = pathsIntersect(
          flowPoints,
          edgeInfo.points as [number, number][],
          intersectionThreshold,
        );
      }

      if (intersects) {
        edgesToDelete.add(edgeInfo.id);
      }
    }

    // Mark intersecting nodes for deletion by updating their data
    setNodes((nodes: ErasableNodeType[]) =>
      nodes.map((node) => {
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

    // Mark intersecting edges for deletion by updating their data
    setEdges((edges: ErasableEdgeType[]) =>
      edges.map((edge) => {
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

  /**
   * Handles the end of an eraser stroke
   * - Releases pointer capture
   * - Actually deletes all marked elements
   * - Resets trail state
   * - Continues animation for trail fade-out
   */
  function handlePointerUp(e: PointerEvent) {
    // Release pointer capture
    (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);

    // Actually remove all elements that were marked for deletion
    deleteElements({
      nodes: nodes.filter((node) => node.data.toBeDeleted),
      edges: edges.filter((edge) => edge.data?.toBeDeleted),
    });

    // Reset drawing state
    trailPoints.current = [];
    isDrawing.current = false;

    // Continue animation to let trail fade out naturally
    if (!animationFrame.current) {
      animate();
    }
  }

  /**
   * Renders the eraser trail on the canvas using perfect-freehand for smooth strokes
   */
  function drawTrail() {
    if (!ctx.current || !canvas.current) return;

    // Clear the entire canvas for fresh rendering
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

    if (trailPoints.current.length < 2) return;

    // Convert trail points to format expected by perfect-freehand (with pressure)
    const strokePoints: [number, number, number][] = trailPoints.current.map(
      ({ point }) => [point[0], point[1], 0.5], // Add constant pressure value
    );

    // Generate smooth stroke path from points
    const stroke = getStroke(strokePoints, pathOptions);

    if (stroke.length < 2) return;

    // Configure canvas for drawing the eraser trail
    ctx.current.fillStyle = '#ef4444'; // Red color for visibility
    ctx.current.globalAlpha = 0.6; // Semi-transparent for overlay effect
    ctx.current.beginPath();

    // Draw the stroke path by connecting all stroke points
    stroke.forEach(([x, y], i) => {
      if (i === 0) {
        ctx.current!.moveTo(x, y);
      } else {
        ctx.current!.lineTo(x, y);
      }
    });

    ctx.current.closePath();
    ctx.current.fill();
    ctx.current.globalAlpha = 1.0; // Reset alpha for subsequent draws
  }

  /**
   * Removes trail points older than 100ms to create a fading effect
   */
  function removeOldPoints() {
    const now = Date.now();
    const cutoffTime = now - 100; // Keep points for 100ms

    trailPoints.current = trailPoints.current.filter((tp) => tp.timestamp > cutoffTime);
  }

  /**
   * Animation loop that continuously updates the trail visualization
   * Continues running while drawing or while there are trail points to fade out
   */
  function animate() {
    removeOldPoints(); // Remove old points for fade effect
    drawTrail(); // Redraw the trail

    // Continue animation if still drawing or if there are points to fade out
    if (isDrawing.current || trailPoints.current.length > 0) {
      animationFrame.current = requestAnimationFrame(animate);
    }
  }

  return (
    <ViewportPortal>
      {/* 
        Canvas overlay for drawing eraser trail and capturing pointer events
        - Positioned absolutely to cover the entire viewport
        - Transforms applied to account for viewport zoom/pan
        - Crosshair cursor indicates eraser tool is active
      */}
      <canvas
        ref={canvas}
        width={width}
        height={height}
        className="nopan nodrag" // Prevent React Flow from handling pan/drag on this element
        style={{
          pointerEvents: 'auto', // Enable pointer events on this overlay
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 4, // Above flow elements but below controls
          height: '100%',
          width: '100%',
          transformOrigin: 'top left', // Important for correct zoom scaling
          cursor: 'crosshair', // Indicate eraser tool
          touchAction: 'none', // Prevent default touch behaviors
          // Transform to account for viewport zoom and pan
          transform: `scale(${1 / viewport.zoom}) translate(${-viewport.x}px, ${-viewport.y}px)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </ViewportPortal>
  );
}
