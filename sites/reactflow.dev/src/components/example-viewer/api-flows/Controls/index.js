import { ReactFlow, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
