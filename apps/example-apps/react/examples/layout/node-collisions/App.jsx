import { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialEdges, initialNodes } from './nodes-and-edges';
import { resolveCollisions } from './resolve-collisions';

function ExampleFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeDragStop = useCallback(() => {
    setNodes((nds) =>
      resolveCollisions(nds, {
        maxIterations: Infinity,
        overlapThreshold: 0.5,
        margin: 15,
      }),
    );
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDragStop={onNodeDragStop}
      minZoom={0}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}

export default ExampleFlow;
