import React from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<Node<NodeData>>) {
  return (
    <>
      <input defaultValue={data.label} />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default MindMapNode;
