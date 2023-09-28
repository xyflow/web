import React from 'react';
import ReactFlow, { Controls, Panel, NodeOrigin, ConnectionLineType } from 'reactflow';
import { shallow } from 'zustand/shallow';

import useStore, { RFState } from './store';

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});

// this makes the node origin to be in the center of a node
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

function Flow() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange } = useStore(selector, shallow);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeOrigin={nodeOrigin}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineStyle={connectionLineStyle}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left">React Flow Mind Map</Panel>
    </ReactFlow>
  );
}

export default Flow;
