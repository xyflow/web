import React from 'react';
import ReactFlow, { Controls, Panel } from 'reactflow';

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css';

function Flow() {
  return (
    <ReactFlow>
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow Mind Map</Panel>
    </ReactFlow>
  );
}

export default Flow;
