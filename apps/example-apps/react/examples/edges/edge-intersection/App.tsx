import React, { useCallback, useRef } from 'react';
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type OnNodeDrag,
  useReactFlow,
  type Node,
  type Edge,
  type DefaultEdgeOptions,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const defaultEdgeOptions: DefaultEdgeOptions = {
  interactionWidth: 75,
};

const initialNodes: Node[] = [
  {
    id: 'a',
    type: 'input',
    position: { x: 200, y: 0 },
    data: { label: 'Node A' },
  },
  {
    id: 'b',
    position: { x: 0, y: 200 },
    data: { label: 'Node B' },
  },
  { id: 'c', position: { x: 0, y: 0 }, data: { label: 'Node C' } },
];
const initialEdges: Edge[] = [{ id: 'a->b', source: 'a', target: 'b' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges],
  );

  const { updateEdge, getEdge, addEdges } = useReactFlow();

  const overlappedEdgeRef = useRef<string | null>(null);

  const onNodeDragStop: OnNodeDrag = useCallback(
    (event, node) => {
      const edgeId = overlappedEdgeRef.current;
      if (!edgeId) return;
      const edge = getEdge(edgeId);
      if (!edge) return;

      updateEdge(edgeId, { source: edge.source, target: node.id, style: {} });

      addEdges({
        id: `${node.id}->${edge.target}`,
        source: node.id,
        target: edge.target,
      });

      overlappedEdgeRef.current = null;
    },
    [getEdge, addEdges, updateEdge],
  );

  const onNodeDrag: OnNodeDrag = useCallback(
    (e, node) => {
      const nodeDiv = document.querySelector(
        `.react-flow__node[data-id=${node.id}]`,
      );

      if (!nodeDiv) return;

      const rect = nodeDiv.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const edgeFound = document
        .elementsFromPoint(centerX, centerY)
        .find((el) =>
          el.classList.contains('react-flow__edge-interaction'),
        )?.parentElement;

      const edgeId = edgeFound?.dataset.id;

      if (edgeId) updateEdge(edgeId, { style: { stroke: 'black' } });
      else if (overlappedEdgeRef.current)
        updateEdge(overlappedEdgeRef.current, { style: {} });

      overlappedEdgeRef.current = edgeId || null;
    },
    [updateEdge],
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      onNodeDrag={onNodeDrag}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
