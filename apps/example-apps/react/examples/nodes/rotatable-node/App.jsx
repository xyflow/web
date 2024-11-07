import React from 'react';
import { ReactFlow, Background } from '@xyflow/react';

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
      style={{ backgroundColor: "#F7F9FB" }}
    >
      <Background />
    </ReactFlow>
  );
}

export default Flow;
