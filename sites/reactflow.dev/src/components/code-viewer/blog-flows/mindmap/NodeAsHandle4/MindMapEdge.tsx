import React from 'react';
import { BaseEdge, EdgeProps, getStraightPath } from 'reactflow';

function MindMapEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY } = props;

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY: sourceY + 20,
    targetX,
    targetY,
  });

  return <BaseEdge path={edgePath} {...props} />;
}

export default MindMapEdge;
