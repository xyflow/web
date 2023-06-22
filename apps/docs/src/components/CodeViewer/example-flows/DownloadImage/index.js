import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Background } from 'reactflow';

import DownloadButton from './DownloadButton';
import CustomNode from './CustomNode';
import { initialNodes, initialEdges } from './nodes-edges';

import 'reactflow/dist/style.css';
import './index.css';

const connectionLineStyle = { stroke: '#ffff' };
const snapGrid = [25, 25];
const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const DownloadImageFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      connectionLineType="smoothstep"
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
      defaultEdgeOptions={defaultEdgeOptions}
      className="download-image"
    >
      <Controls />
      <Background gap={25} />
      <DownloadButton />
    </ReactFlow>
  );
};

export default DownloadImageFlow;
