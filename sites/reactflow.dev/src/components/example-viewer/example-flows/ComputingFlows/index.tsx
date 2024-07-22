import { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import TextNode from './TextNode';
import ResultNode from './ResultNode';
import UppercaseNode from './UppercaseNode';
import { MyNode } from './utils';

const nodeTypes = {
  text: TextNode,
  result: ResultNode,
  uppercase: UppercaseNode,
};

const initNodes: MyNode[] = [
  {
    id: '1',
    type: 'text',
    data: {
      text: 'hello',
    },
    position: { x: -100, y: -50 },
  },
  {
    id: '2',
    type: 'text',
    data: {
      text: 'world',
    },
    position: { x: 0, y: 100 },
  },
  {
    id: '3',
    type: 'uppercase',
    data: { text: '' },
    position: { x: 100, y: -100 },
  },
  {
    id: '4',
    type: 'result',
    data: {},
    position: { x: 300, y: -75 },
  },
];

const initEdges: Edge[] = [
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
  },
];

const CustomNodeFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
