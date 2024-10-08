import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type Edge,
  type OnConnect,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import DevTools from './Devtools';

const initNodes: Node[] = [
  {
    id: '1a',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2a',
    data: { label: 'Node 2' },
    position: { x: 100, y: 120 },
  },
  {
    id: '3a',
    data: { label: 'Node 3' },
    position: { x: 400, y: 120 },
  },
];

const initEdges: Edge[] = [
  { id: 'e1-2', source: '1a', target: '2a' },
  { id: 'e1-3', source: '1a', target: '3a' },
];

const fitViewOptions = { padding: 0.5 };

function Flow() {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
    >
      <DevTools />
    </ReactFlow>
  );
}

export default Flow;
