import React from 'react';
import { ReactFlow, ReactFlowProvider, Background } from '@xyflow/react';
import { shallow } from 'zustand/shallow';

import { useStore } from './store';
import Osc from './nodes/Osc';
import Amp from './nodes/Amp';
import Out from './nodes/Out';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
});

export default function App() {
  const store = useStore(selector, shallow);

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={store.nodes}
          edges={store.edges}
          onNodesChange={store.onNodesChange}
          onNodesDelete={store.onNodesDelete}
          onEdgesChange={store.onEdgesChange}
          onEdgesDelete={store.onEdgesDelete}
          onConnect={store.addEdge}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
