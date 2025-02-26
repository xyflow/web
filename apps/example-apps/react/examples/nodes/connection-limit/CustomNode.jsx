import React, { memo } from 'react';
import { Position } from '@xyflow/react';

import CustomHandle from './CustomHandle';

const CustomNode = () => {
  return (
    <div>
      <CustomHandle
        type="target"
        position={Position.Left}
        connectionCount={1}
      />
      <div>{'← Only one edge allowed'}</div>
    </div>
  );
};

export default memo(CustomNode);
