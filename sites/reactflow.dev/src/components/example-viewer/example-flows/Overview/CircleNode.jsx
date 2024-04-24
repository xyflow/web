import React, { memo } from 'react';
import { Handle, useStore, Position } from 'reactflow';

export default memo(({ id }) => {
  const label = useStore((s) => {
    const node = s.nodeInternals.get('2-3');
    const isConnected = s.edges.some((edge) => edge.target === id);

    if (!node || !isConnected) {
      return null;
    }

    return `position ${parseInt(node.position.x)}x ${parseInt(
      node.position.y,
    )}y`;
  });

  return (
    <>
      <div className="wrapper gradient">
        <div className="inner">{label || 'no node connected'}</div>
      </div>
      <Handle type="target" position={Position.Left} />
    </>
  );
});
