import React, { memo } from 'react';
import { Handle, useStore, Position } from '@xyflow/react';

export default memo(({ id }) => {
  const label = useStore((s) => {
    const node = s.nodeLookup.get(id);

    if (!node) {
      return null;
    }

    return `Position x:${parseInt(node.position.x)} y:${parseInt(
      node.position.y,
    )}`;
  });

  return (
    <div className='react-flow__node-circle--inner'>
      <div>{label || 'no node connected'}</div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
});