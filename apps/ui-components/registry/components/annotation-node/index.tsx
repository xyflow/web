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
  let angleDeg: number | null = null;
  if (parentNode && internalNode) {
    const edgeParams = getEdgeParams(internalNode, parentNode);
    [path] = getBezierPath(edgeParams);

    const p2 = parentNode?.internals.positionAbsolute;
    const p1 = internalNode?.internals.positionAbsolute;
    angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
  }

  console.log(angleDeg);

  return (
    <div className="relative flex max-w-[180px] items-start p-2 text-sm text-secondary-foreground">
      <div className="mr-1 leading-snug">{data.level}.</div>
      <div className="leading-snug">{data.label}</div>
      {path && angleDeg !== null && (
        <ViewportPortal>
          <svg className="absolute overflow-visible">
            <defs>
              <marker
                id={`head${id}`}
                orient={`${angleDeg}deg`}
                viewBox="0 0 5 4"
                markerWidth="10"
                markerHeight="10"
                refX="0.1"
                refY="2"
              >
                <path d="M0,0 V4 L2,2 Z" fill="black" />
              </marker>
            </defs>
            <path
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              markerEnd={`url(#head${id})`}
            />
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

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: InternalNode, target: InternalNode) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source, 20);

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

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(
  intersectionNode: InternalNode,
  targetNode: InternalNode,
  margin = 0,
) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const intersectionNodeWidth =
    (intersectionNode.measured.width ?? 1) + margin * 2;
  const intersectionNodeHeight =
    (intersectionNode.measured.height ?? 1) + margin * 2;
  // const { width: intersectionNodeWidth, height: intersectionNodeHeight } =
  //   intersectionNode.measured;
  const intersectionNodePosition = {
    x: intersectionNode.internals.positionAbsolute.x - margin,
    y: intersectionNode.internals.positionAbsolute.y - margin,
  };
  const targetPosition = targetNode.internals.positionAbsolute;

  const w = (intersectionNodeWidth ?? 1) / 2;
  const h = (intersectionNodeHeight ?? 1) / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + (targetNode.measured.width ?? 1) / 2;
  const y1 = targetPosition.y + (targetNode.measured.height ?? 1) / 2;

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
