// @ts-nocheck
import { EdgeProps, useReactFlow } from 'reactflow';

import { uuid, randomLabel } from '../utils';

function useEdgeClick(id: EdgeProps['id']) {
  const { setEdges, setNodes, getNode, getEdge } = useReactFlow();

  const handleEdgeClick = () => {
    const edge = getEdge(id);
    const targetNode = getNode(edge.target);
    const insertNodeId = uuid();

    const insertNode = {
      id: insertNodeId,
      position: { x: targetNode.position.x, y: targetNode.position.y },
      data: { label: randomLabel() },
      type: 'workflow',
    };

    const sourceEdge = {
      id: `${edge.source}->${insertNodeId}`,
      source: edge.source,
      target: insertNodeId,
      type: 'custom',
    };

    const targetEdge = {
      id: `${insertNodeId}->${edge.target}`,
      source: insertNodeId,
      target: edge.target,
      type: 'custom',
    };

    setEdges((edges) => edges.filter((e) => e.id !== id).concat([sourceEdge, targetEdge]));
    setNodes((nodes) => {
      const targetNodeIndex = nodes.findIndex((node) => node.id === edge.target);

      return [...nodes.slice(0, targetNodeIndex), insertNode, ...nodes.slice(targetNodeIndex, nodes.length)];
    });
  };

  return handleEdgeClick;
}

export default useEdgeClick;
