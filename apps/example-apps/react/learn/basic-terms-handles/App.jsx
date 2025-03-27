'use client';

import React from 'react';
import { ReactFlow, ReactFlowProvider, Handle, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

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
  padding: '10px',
  width: '150px',
  fontSize: '12px',
  color: 'inherit',
  textAlign: 'center',
  border: '1px solid #1a192b',
  borderRadius: '3px',
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
        height: '100%',
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
