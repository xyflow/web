import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';


import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <Background
        id="1"
        gap={10}
        color="#f1f1f1"
        variant={BackgroundVariant.Lines}
      />
      <Background
        id="2"
        gap={100}
        offset={1}
        color="#ccc"
        variant={BackgroundVariant.Lines}
      />
    </ReactFlow>
  );
}

export default Flow;
