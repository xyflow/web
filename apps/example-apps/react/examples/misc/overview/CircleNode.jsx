import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ id, positionAbsoluteX, positionAbsoluteY }) => {
  const label = `Position x:${Math.round(positionAbsoluteX)} y:${Math.round(positionAbsoluteY)}`;

  return (
    <div>
      <div>{label || 'no node connected'}</div>
      <Handle
        type="target"
        position={Position.Left}
        className="custom-handle"
      />
    </div>
  );
});
