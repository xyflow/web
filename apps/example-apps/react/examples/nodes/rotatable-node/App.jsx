import React from 'react';
import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import RotatableNode from './RotatableNode';
import { nodes, edges } from './initialElements';

const nodeTypes = {
  rotatableNode: RotatableNode,
};

function Flow() {
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      defaultNodes={nodes}
      defaultEdges={edges}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}

export default Flow;
