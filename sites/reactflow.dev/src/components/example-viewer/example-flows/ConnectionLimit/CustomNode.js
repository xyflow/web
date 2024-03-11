import React, { memo } from 'react';
import { Position } from '@xyflow/react';

import CustomHandle from './CustomHandle';

const nodeStyle = {
  background: 'white',
  padding: 16,
  border: '1px solid black',
};

const CustomNode = () => {
  return (
    <div style={nodeStyle}>
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
