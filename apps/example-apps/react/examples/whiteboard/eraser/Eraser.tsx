import getStroke from 'perfect-freehand';
import { useRef, useEffect, type PointerEvent } from 'react';
import {
  useEdges,
  useNodes,
  useReactFlow,
  useStore,
  type ReactFlowState,
} from '@xyflow/react';

import { polylineIntersectsRectangle, pathsIntersect } from './utils';
import { ErasableNodeType } from './ErasableNode';
import { ErasableEdgeType } from './ErasableEdge';

// Type definitions for path coordinates
// - can be 2D or 3D points (with pressure) for freehand strokes for instance
type PathPoints = ([number, number] | [number, number, number])[];

type IntersectionData = {
  id: string;
  type?: string;
  points?: PathPoints;
  rect?: { x: number; y: number; width: number; height: number };
};

type TimestampedPoint = {
  point: [number, number];
  timestamp: number;
};

// Threshold distance for detecting intersections between paths
const intersectionThreshold = 5;

// Distance between points to sample for edge intersection detection
// This is a trade-off between performance and accuracy
const sampleDistance = 150;

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

const storeSelector = (state: ReactFlowState) => ({
  width: state.width,
  height: state.height,
});

const canvasStyle = {
  pointerEvents: 'auto' as const,
  position: 'absolute' as const,
  top: 0,
  left: 0,
  zIndex: 4,
  height: '100%',
  width: '100%',
  transformOrigin: 'top left' as const,
  cursor: 'crosshair' as const,
  touchAction: 'none' as const,
};

/**
 * Eraser component that provides an overlay canvas for erasing nodes and edges.
 * Draws a visual trail and detects intersections with flow elements to mark them for deletion.
 */
export function Eraser() {
  const { width, height } = useStore(storeSelector);
  const { screenToFlowPosition, deleteElements, getInternalNode, setNodes, setEdges } =
    useReactFlow<ErasableNodeType, ErasableEdgeType>();
  const nodes = useNodes<ErasableNodeType>();
  const edges = useEdges<ErasableEdgeType>();

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | undefined | null>();

  // Cached intersection data for performance during dragging
  const nodeIntersectionData = useRef<IntersectionData[]>([]);
  const edgeIntersectionData = useRef<IntersectionData[]>([]);

  const trailPoints = useRef<TimestampedPoint[]>([]);
  const animationFrame = useRef<number>(0);
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  function handlePointerDown(e: PointerEvent<HTMLCanvasElement>) {
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);

    isDrawing.current = true;
    trailPoints.current = [
      {
        point: [e.pageX, e.pageY],
        timestamp: Date.now(),
      },
    ];

    nodeIntersectionData.current = [];
    for (const node of nodes) {
      const internalNode = getInternalNode(node.id);
      if (!internalNode) continue;

      const { x, y } = internalNode.internals.positionAbsolute;
      const { width = 0, height = 0 } = internalNode.measured;

      nodeIntersectionData.current.push({
        id: node.id,
        type: node.type,
        rect: { x, y, width, height },
      });
    }

    edgeIntersectionData.current = [];

    for (const edge of edges) {
      const path = document.querySelector<SVGPathElement>(
        `.react-flow__edge[data-id="${edge.id}"] path`,
      );

      if (!path) continue;

      const length = path.getTotalLength();
      const steps = length / Math.max(10, length / sampleDistance);
      const points: [number, number][] = [];

      for (let i = 0; i <= length + steps; i += steps) {
        const point = path.getPointAtLength(i);
        points.push([point.x, point.y]);
      }

      edgeIntersectionData.current.push({
        id: edge.id,
        type: edge.type,
        points,
      });
    }

    ctx.current = canvas.current?.getContext('2d');
    if (!ctx.current) return;
    ctx.current.lineWidth = 1;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animate();
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1) return;

    trailPoints.current.push({
      point: [e.pageX, e.pageY],
      timestamp: Date.now(),
    });

    const points = trailPoints.current.map((tp) => tp.point);

    if (!ctx.current || points.length < 2) return;

    const flowPoints = points.map(([x, y]) => {
      const flowPos = screenToFlowPosition({ x, y });
      return [flowPos.x, flowPos.y] as [number, number];
    });

    const nodesToDelete = new Set<string>();
    const edgesToDelete = new Set<string>();

    for (const nodeInfo of nodeIntersectionData.current) {
      let intersects = false;

      if (nodeInfo.type === 'freehand' && nodeInfo.points) {
        intersects = pathsIntersect(
          flowPoints,
          nodeInfo.points as [number, number][],
          intersectionThreshold,
        );
      } else if (nodeInfo.rect) {
        intersects = polylineIntersectsRectangle(flowPoints, nodeInfo.rect);
      }

      if (intersects) {
        nodesToDelete.add(nodeInfo.id);
      }
    }

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

    setNodes((nodes: ErasableNodeType[]) =>
      nodes.map((node) => {
        if (nodesToDelete.has(node.id)) {
          return {
            ...node,
            data: {
              ...node.data,
              toBeDeleted: true,
            },
          };
        }
        return node;
      }),
    );

    setEdges((edges: ErasableEdgeType[]) =>
      edges.map((edge) => {
        if (edgesToDelete.has(edge.id)) {
          return {
            ...edge,
            data: {
              ...edge.data,
              toBeDeleted: true,
            },
          };
        }
        return edge;
      }),
    );
  }

  function handlePointerUp(e: PointerEvent) {
    (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);

    deleteElements({
      nodes: nodes.filter((node) => node.data.toBeDeleted),
      edges: edges.filter((edge) => edge.data?.toBeDeleted),
    });

    trailPoints.current = [];
    isDrawing.current = false;

    if (!animationFrame.current) {
      animate();
    }
  }

  function drawTrail() {
    if (!ctx.current || !canvas.current) return;

    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

    if (trailPoints.current.length < 2) return;

    const strokePoints: [number, number, number][] = trailPoints.current.map(
      ({ point }) => [point[0], point[1], 0.5],
    );

    const stroke = getStroke(strokePoints, pathOptions);

    if (stroke.length < 2) return;

    ctx.current.fillStyle = '#ef4444';
    ctx.current.globalAlpha = 0.6;
    ctx.current.beginPath();

    stroke.forEach(([x, y], i) => {
      if (i === 0) {
        ctx.current!.moveTo(x, y);
      } else {
        ctx.current!.lineTo(x, y);
      }
    });

    ctx.current.closePath();
    ctx.current.fill();
    ctx.current.globalAlpha = 1.0;
  }

  function removeOldPoints() {
    const now = Date.now();
    const cutoffTime = now - 100;

    trailPoints.current = trailPoints.current.filter((tp) => tp.timestamp > cutoffTime);
  }

  function animate() {
    removeOldPoints();
    drawTrail();

    if (isDrawing.current || trailPoints.current.length > 0) {
      animationFrame.current = requestAnimationFrame(animate);
    }
  }

  return (
    <canvas
      ref={canvas}
      width={width}
      height={height}
      className="nopan nodrag"
      style={canvasStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
}
