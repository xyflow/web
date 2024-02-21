import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  useStore,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';

const selector = (s) => s.transform;

function ViewportInfo() {
  const [x, y, zoom] = useStore(selector);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700 }}>
        Current Viewport: x: {x.toFixed(2)}, y: {y.toFixed(2)}, zoom:{' '}
        {zoom.toFixed(2)}{' '}
      </div>
    </div>
  );
}

const nodeStyle = {
  background: 'white',
  border: '1px solid #333',
  padding: 10,
  width: 100,
  textAlign: 'left',
  borderRadius: 2,
  boxShadow:
    'rgb(0 0 0 / 10%) 0px 4px 6px -1px, rgb(0 0 0 / 6%) 0px 2px 4px -1px',
};

function XYNode({ xPos, yPos }) {
  return (
    <div style={nodeStyle}>
      <div>x: {xPos.toFixed(2)}</div>
      <div>y: {yPos.toFixed(2)}</div>
    </div>
  );
}

const nodeTypes = {
  xy: XYNode,
};

const nodeDefaults = {
  type: 'xy',
  data: {},
};

const nodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: '2',
    position: { x: 250, y: 0 },
    ...nodeDefaults,
  },
  {
    id: '3',
    position: { x: 250, y: 250 },
    ...nodeDefaults,
  },
  {
    id: '4',
    position: { x: 0, y: 250 },
    ...nodeDefaults,
  },
];

function Flow() {
  return (
    <ReactFlowProvider>
      <div
        style={{
          height: 400,
          border: '3px solid #333',
          background: '#FAF5FF',
          position: 'relative',
        }}
      >
        <ReactFlow
          defaultNodes={nodes}
          preventScrolling={false}
          nodeTypes={nodeTypes}
        >
          <Background gap={25} />
          <Controls position="top-right" showInteractive={false} />
        </ReactFlow>
      </div>
      <ViewportInfo />
    </ReactFlowProvider>
  );
}

export default Flow;
