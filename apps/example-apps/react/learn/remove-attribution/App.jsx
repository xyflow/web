import React from 'react';
import { ReactFlow, Background } from '@xyflow/react';

import { nodes, edges } from './initialElements';

/**
 * This example demonstrates how you can remove the attribution from the React Flow renderer.
 * Please only hide the attribution if you are subscribed to React Flow Pro: https://reactflow.dev/pro
 */
const proOptions = { hideAttribution: true };

function RemoveAttributionExample() {
  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      fitView
      proOptions={proOptions}
      nodesDraggable
    >
      <Background />
    </ReactFlow>
  );
}

export default RemoveAttributionExample;
