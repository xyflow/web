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
      <div>Connection Limit 1</div>
    </div>
  );
};

export default memo(CustomNode);
