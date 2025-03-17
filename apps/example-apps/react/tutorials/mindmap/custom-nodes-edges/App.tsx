import React from 'react';
import {
  ReactFlow,
  Controls,
  Panel,
  ConnectionLineType,
  type NodeOrigin,
} from '@xyflow/react';
import { useShallow } from 'zustand/shallow';

import useStore, { type RFState } from './store';
import MindMapNode from './MindMapNode';
import MindMapEdge from './MindMapEdge';

import './index.css';

// we need to import the React Flow styles to make it work
import '@xyflow/react/dist/style.css';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});

const nodeTypes = {
  mindMap: MindMapNode,
};

const edgeTypes = {
  mindMap: MindMapEdge,
};

// this makes the node origin to be in the center of a node
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindMap' };

function Flow() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange } = useStore(
    useShallow(selector),
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow Mind Map</Panel>
    </ReactFlow>
  );
}

export default Flow;
