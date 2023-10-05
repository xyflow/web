import ReactFlow, { Controls, ControlButton } from 'reactflow';
import 'reactflow/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

function CustomControls() {
  return (
    <Controls>
      <ControlButton onClick={() => console.log('action')} title="action">
        <div>1</div>
      </ControlButton>
      <ControlButton onClick={() => console.log('another action')} title="another action">
        <div>2</div>
      </ControlButton>
    </Controls>
  );
}

function Flow() {
  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <CustomControls />
    </ReactFlow>
  );
}

export default Flow;
