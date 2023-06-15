// @ts-nocheck
import { useCallback } from 'react';
import { NodeProps, useReactFlow, getOutgoers } from 'reactflow';

import { uuid, randomLabel } from '../utils';

export function useNodeClick(id: NodeProps['id']) {
  const { setEdges, setNodes, getNodes, getEdges, addEdges, getNode } = useReactFlow();

  const onClick = useCallback(() => {
    const parentNode = getNode(id);
    const childNodeId = uuid();
    const childPlaceholderId = uuid();

    const childNode = {
      id: childNodeId,
      position: { x: parentNode.position.x, y: parentNode.position.y + 150 },
      type: 'workflow',
      data: { label: randomLabel() },
    };

    const childPlaceholderNode = {
      id: childPlaceholderId,
      position: { x: childNode.position.x, y: childNode.position.y + 150 },
      type: 'placeholder',
      data: { label: '+' },
    };

    const childEdge = {
      id: `${parentNode.id}=>${childNodeId}`,
      source: parentNode.id,
      target: childNodeId,
      type: 'custom',
    };

    const childPlaceholderEdge = {
      id: `${childNodeId}=>${childPlaceholderId}`,
      source: childNodeId,
      target: childPlaceholderId,
      type: 'placeholder',
    };

    const existingPlaceholders = getOutgoers(parentNode, getNodes(), getEdges())
      .filter((node) => node.type === 'placeholder')
      .map((node) => node.id);

    setNodes((nodes) =>
      nodes.filter((node) => !existingPlaceholders.includes(node.id)).concat([childNode, childPlaceholderNode])
    );
    setEdges((edges) =>
      edges.filter((edge) => !existingPlaceholders.includes(edge.target)).concat([childEdge, childPlaceholderEdge])
    );
  }, [getEdges, getNode, getNodes, id, setEdges, setNodes]);

  return onClick;
}

export default useNodeClick;
