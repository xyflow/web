import { ReactFlow, Controls } from '@xyflow/react';

import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
