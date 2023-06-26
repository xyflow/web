import React from 'react';
import ReactFlow, { ReactFlowProvider, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

import './handles.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {},
    type: 'handles',
  },
];

const handleWidth = 12;
const handleStyle = { width: handleWidth, height: handleWidth, borderRadius: 4 };

function CustomNode() {
  return (
    <>
      <div>A node with four handles</div>
      <Handle position={Position.Top} style={{ ...handleStyle, top: -handleWidth / 2 }} id="a" />
      <Handle
        position={Position.Right}
        style={{ ...handleStyle, right: -handleWidth / 2 }}
        id="b"
      />
      <Handle
        position={Position.Bottom}
        style={{ ...handleStyle, bottom: -handleWidth / 2 }}
        id="c"
      />
      <Handle position={Position.Left} style={{ ...handleStyle, left: -handleWidth / 2 }} id="d" />
    </>
  );
}

const nodeTypes = {
  handles: CustomNode,
};

const fitViewOptions = { padding: 1 };

function Flow() {
  return (
    <div style={{ height: 250, background: '#FAF5FF', border: '1px solid #333', marginBottom: 20 }}>
      <ReactFlowProvider>
        <ReactFlow
          defaultNodes={initialNodes}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitViewOptions}
          preventScrolling={false}
        />
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
