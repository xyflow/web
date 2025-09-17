import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeText,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  label,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  markerEnd = selected ? 'url(#selected-marker)' : markerEnd;

  const color = selected ? '#FFCC00' : style.stroke;

  console.log(label);
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: color, ...style }}
        label={label}
      />

      <EdgeText x={labelX} y={labelY} label={label} />
    </>
  );
}
