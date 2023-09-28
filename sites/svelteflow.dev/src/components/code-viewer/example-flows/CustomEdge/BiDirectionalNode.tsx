import React, { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

const style = {
  padding: 10,
  background: '#fff',
  border: '1px solid #ddd',
};

const BiDirectionalNode = ({ data }: NodeProps) => {
  return (
    <div style={style}>
      <Handle type="source" position={Position.Left} id="left" />
      {data?.label}
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
};

export default memo(BiDirectionalNode);
