import { ReactFlow, Controls, Background } from '@xyflow/react';

function Flow() {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
