import React, { memo } from 'react';
import {
  type BuiltInNode,
  type NodeProps,
  Handle,
  Position,
} from '@xyflow/react';

const BiDirectionalNode = ({ data }: NodeProps<BuiltInNode>) => {
  return (
    <>
      <Handle type="source" position={Position.Left} id="left" />
      {data?.label}
      <Handle type="source" position={Position.Right} id="right" />
    </>
  );
};

export default memo(BiDirectionalNode);
