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

import '@xyflow/react/dist/style.css';

import { TooltipNode } from './components/tooltip-node';

const nodeTypes = {
  tooltip: TooltipNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: {
      label: 'Hover me',
      tooltip: {
        label: 'Boo!',
        position: Position.Bottom,
      },
    },
    type: 'tooltip',
  },
];

const initialEdges: Edge[] = [];

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
