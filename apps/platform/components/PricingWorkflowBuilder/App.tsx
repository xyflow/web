import React from 'react';
import ReactFlow, { Background, Controls, Edge, Node, ProOptions, ReactFlowProvider } from 'reactflow';

import useLayout from './hooks/useLayout';
import nodeTypes from './NodeTypes';
import edgeTypes from './EdgeTypes';

import 'reactflow/dist/style.css';

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

const defaultNodes: Node[] = [
  {
    id: '1',
    data: { label: '🌮 Taco' },
    position: { x: 0, y: 0 },
    type: 'workflow',
  },
  {
    id: '2',
    data: { label: '+' },
    position: { x: 0, y: 150 },
    type: 'placeholder',
  },
];

const defaultEdges: Edge[] = [
  {
    id: '1=>2',
    source: '1',
    target: '2',
    type: 'placeholder',
  },
];

const fitViewOptions = {
  padding: 0.95,
};

const controlsStyle = {
  opacity: 0.8,
};

function ReactFlowPro() {
  useLayout();

  return (
    <>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        proOptions={proOptions}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        zoomOnDoubleClick={false}
        minZoom={0.2}
        preventScrolling={false}
        deleteKeyCode={null}
      >
        <Background />
        <Controls position="bottom-right" showInteractive={false} style={controlsStyle} />
      </ReactFlow>
    </>
  );
}

function ReactFlowWrapper() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
