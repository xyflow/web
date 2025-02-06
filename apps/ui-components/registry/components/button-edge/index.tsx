import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";

import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

function EdgeButton() {
  const onEdgeClick = () => {
    window.alert(`Edge has been clicked!`);
  };

  return (
    <Button onClick={onEdgeClick} size="icon" variant="secondary">
      <MousePointerClick size={16} />
    </Button>
  );
}

export function ButtonEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <EdgeButton />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
