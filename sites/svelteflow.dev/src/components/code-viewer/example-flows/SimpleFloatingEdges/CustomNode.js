import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data }) => {
  return (
    <>
      {data.label}
      <Handle type="source" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="source" position={Position.Bottom} id="c" />
      <Handle type="source" position={Position.Left} id="d" />
    </>
  );
});
