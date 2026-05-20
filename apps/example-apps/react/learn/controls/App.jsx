import { ReactFlow, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView colorMode="system">
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
