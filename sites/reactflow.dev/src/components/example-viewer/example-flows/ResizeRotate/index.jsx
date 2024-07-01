import React from 'react';
import { ReactFlow, Background } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import ResizeRotateNode from './ResizeRotateNode';
import { nodes, edges } from './nodes-edges';

const nodeTypes = {
  resizeRotate: ResizeRotateNode,
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
