import React from 'react';
import ReactFlow, { Background, Controls, ReactFlowProvider, useStore } from 'reactflow';
import 'reactflow/dist/style.css';

import './viewport.css';

const selector = (s) => s.transform;

function ViewportInfo() {
  const [x, y, zoom] = useStore(selector);

  return (
    <div className="viewport-info">
      <div className="viewport-info__title">
        Current Viewport: x: {x.toFixed(2)}, y: {y.toFixed(2)}, zoom: {zoom.toFixed(2)}{' '}
      </div>
    </div>
  );
}

function XYNode({ xPos, yPos }) {
  return (
    <>
      <div>x: {xPos.toFixed(2)}</div>
      <div>y: {yPos.toFixed(2)}</div>
    </>
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
        <ReactFlow defaultNodes={nodes} preventScrolling={false} nodeTypes={nodeTypes}>
          <Background gap={25} />
          <Controls position="top-right" showInteractive={false} />
        </ReactFlow>
      </div>
      <ViewportInfo />
    </ReactFlowProvider>
  );
}

export default Flow;
