import React from 'react';
import { useConnection } from '@xyflow/react';

export default ({ fromX, fromY, toX, toY }) => {
  const { startHandle } = useConnection();

  return (
    <g>
      <path
        fill="none"
        stroke={startHandle.handleId}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={startHandle.handleId}
        strokeWidth={1.5}
      />
    </g>
  );
};
