import React from 'react';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';

export type NodeData = {
  label: string;
};

import useStore from './store';

function MindMapNode({ id, data }: NodeProps<Node<NodeData>>) {
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  return (
    <>
      <input
        value={data.label}
        onChange={(evt) => updateNodeLabel(id, evt.target.value)}
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default MindMapNode;
