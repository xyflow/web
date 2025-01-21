import React, { useCallback } from 'react';
import {
  ReactFlow,
  type Node,
  type Edge,
  type OnConnect,
  Position,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import { NumNode } from './components/nodes/num-node';
import { SumNode } from './components/nodes/sum-node';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  num: NumNode,
  sum: SumNode,
};

const initialNodes: Node[] = [
  { id: 'a', type: 'num', data: { value: 0 }, position: { x: 0, y: 0 } },
  { id: 'b', type: 'num', data: { value: 0 }, position: { x: 0, y: 200 } },
  { id: 'c', type: 'sum', data: { value: 0 }, position: { x: 300, y: 100 } },
];

const initialEdges: Edge[] = [
  { id: 'a->c', source: 'a', target: 'c', targetHandle: 'x' },
  { id: 'b->c', source: 'b', target: 'c', targetHandle: 'y' },
];

function Flow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = (params) => {
    setEdges((edges) => addEdge(params, edges));
  };

  return (
    <div className="h-screen w-screen p-8 bg-gray-50 rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
}
export function App() {
  return <Flow />;
}
