import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import './index.css';

const initialNodes = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 } },
  { id: 'A', type: 'customnode', position: { x: 250, y: 0 } },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 } },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 } },
];

const isValidConnection = (connection) => connection.target === 'B';
const onConnectStart = (_, { nodeId, handleType }) =>
  console.log('on connect start', { nodeId, handleType });
const onConnectEnd = (event) => console.log('on connect end', event);

const CustomInput = () => (
  <>
    <div>Only connectable with B</div>
    <Handle type="source" position={Position.Right} />
  </>
);

const CustomNode = ({ id }) => (
  <>
    <Handle type="target" position={Position.Left} />
    <div>{id}</div>
    <Handle type="source" position={Position.Right} />
  </>
);

const nodeTypes = {
  custominput: CustomInput,
  customnode: CustomNode,
};

const ValidationFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      isValidConnection={isValidConnection}
      selectNodesOnDrag={false}
      className="validationflow"
      nodeTypes={nodeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      fitView
      attributionPosition="bottom-left"
    />
  );
};

export default ValidationFlow;
