import React from 'react';
import ReactFlow, { ReactFlowProvider, Handle, Position } from 'reactflow';
import 'reactflow/dist/base.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {},
    type: 'handles',
  },
];

const handleWidth = 12;
const handleStyle = {
  width: handleWidth,
  height: handleWidth,
  borderRadius: 4,
};

const nodeStyle = {
  background: 'white',
  border: '1px solid #bbb',
  padding: 12,
  width: 300,
  borderRadius: 2,
  textAlign: 'center',
  height: 50,
  boxShadow: 'none',
};

function CustomNode() {
  return (
    <div style={nodeStyle}>
      <div>A node with four handles</div>
      <Handle
        position={Position.Top}
        style={{ ...handleStyle, top: -handleWidth / 2 }}
        id="a"
      />
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
      <Handle
        position={Position.Left}
        style={{ ...handleStyle, left: -handleWidth / 2 }}
        id="d"
      />
    </div>
  );
}

const nodeTypes = {
  handles: CustomNode,
};

const fitViewOptions = { padding: 1 };

function Flow() {
  return (
    <div
      style={{
        height: 250,
        background: '#FAF5FF',
        border: '1px solid #333',
        marginBottom: 20,
      }}
    >
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
