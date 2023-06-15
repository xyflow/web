import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

import useEdgeClick from '../hooks/useEdgeClick';
import styles from './EdgeTypes.module.css';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}: EdgeProps) {
  const handleEdgeClick = useEdgeClick(id);

  const [edgePath, edgeCenterX, edgeCenterY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path id={id} style={style} className={styles.edgePath} d={edgePath} markerEnd={markerEnd} />
      <g transform={`translate(${edgeCenterX}, ${edgeCenterY})`}>
        <rect
          onClick={handleEdgeClick}
          x={-10}
          y={-10}
          width={20}
          ry={4}
          rx={4}
          height={20}
          fill="white"
          stroke="#0984e3"
          pointerEvents="all"
          className={styles.btn}
        />
        <text pointerEvents="none" style={{ userSelect: 'none' }} y={5} x={-4} fill="#0984e3">
          +
        </text>
      </g>
    </>
  );
}
