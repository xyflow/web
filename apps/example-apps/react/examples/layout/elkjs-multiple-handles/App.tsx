import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from '@xyflow/react';


import ElkNode from './ElkNode';
import { nodes as initNodes } from './nodes';
import { edges as initEdges } from './edges';
import useLayoutNodes from './useLayoutNodes';

const nodeTypes = {
  elk: ElkNode,
};

function App() {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  useLayoutNodes();

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      fitView
      nodeTypes={nodeTypes}
      style={{ backgroundColor: "#F7F9FB" }}
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
