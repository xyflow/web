import {
  getBezierPath,
  Position,
  useInternalNode,
  ViewportPortal,
  type Node,
  type NodeProps,
  type InternalNode,
  type XYPosition,
} from "@xyflow/react";
type arrowStyleProps = {
  right?: number;
  bottom?: number;
  transform?: string;
};

type AnnotationNode = Node<{
  label: string;
  level: number;
  arrow: string;
  arrowStyle: arrowStyleProps;
}>;

export function AnnotationNode({
  data,
  id,
  parentId,
}: NodeProps<AnnotationNode>) {
  const parentNode = useInternalNode(parentId ?? "");
  const internalNode = useInternalNode(id);

  let path: string | null = null;
  if (parentNode && internalNode) {
    const edgeParams = getEdgeParams(internalNode, parentNode);
    [path] = getBezierPath(edgeParams);
  }

  return (
    <div className="relative w-40 p-2 text-secondary-foreground">
      <div className="flex items-start">
        <div className="mr-1 leading-snug">{data.level}.</div>
        <div className="leading-snug">{data.label}</div>
      </div>
      {path && (
        <ViewportPortal>
          <svg className="absolute overflow-visible">
            <path d={path} fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </ViewportPortal>
      )}
      {/* {data.arrowStyle && (
        <div
          className="absolute text-2xl"
          style={{
            right: data.arrowStyle.right,
            bottom: data.arrowStyle.bottom,
            transform: data.arrowStyle.transform,
          }}
        >
          {data.arrow}
        </div>
      )} */}
    </div>
  );
}

AnnotationNode.displayName = "AnnotationNode";

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(
  intersectionNode: InternalNode,
  targetNode: InternalNode,
) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
    intersectionNode.measured;
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;

  const w = (intersectionNodeWidth ?? 0) / 2;
  const h = (intersectionNodeHeight ?? 0) / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + (targetNode.measured.width ?? 0) / 2;
  const y1 = targetPosition.y + (targetNode.measured.height ?? 0) / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node: InternalNode, intersectionPoint: XYPosition) {
  const n = { ...node.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (n.measured.width ?? 0) - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + (n.measured.height ?? 0) - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: InternalNode, target: InternalNode) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePosition = getEdgePosition(source, sourceIntersectionPoint);
  const targetPosition = getEdgePosition(target, targetIntersectionPoint);

  return {
    sourceX: sourceIntersectionPoint.x,
    sourceY: sourceIntersectionPoint.y,
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
    sourcePosition,
    targetPosition,
  };
}
