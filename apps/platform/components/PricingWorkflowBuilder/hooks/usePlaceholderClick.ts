// @ts-nocheck
import { NodeProps, useReactFlow } from 'reactflow';

import { uuid, randomLabel } from '../utils';

export function usePlaceholderClick(id: NodeProps['id']) {
  const { addNodes, addEdges, getNode, setNodes, setEdges } = useReactFlow();

  const onClick = () => {
    const parentNode = getNode(id);

    const childPlaceholderId = uuid();

    const childPlaceholderNode = {
      id: childPlaceholderId,
      position: { x: parentNode.position.x, y: parentNode.position.y },
      type: 'placeholder',
      data: { label: '+' },
    };

    const childPlaceholderEdge = {
      id: `${parentNode.id}=>${childPlaceholderId}`,
      source: parentNode.id,
      target: childPlaceholderId,
      type: 'placeholder',
    };

    setNodes((nodes) =>
      nodes
        .map((node) => {
          if (node.id === id) {
            return {
              ...node,
              type: 'workflow',
              data: { label: randomLabel() },
            };
          }
          return node;
        })
        .concat([childPlaceholderNode])
    );

    setEdges((edges) =>
      edges
        .map((edge) => {
          if (edge.target === id) {
            return {
              ...edge,
              type: 'custom',
            };
          }
          return edge;
        })
        .concat([childPlaceholderEdge])
    );
  };

  return onClick;
}

export default usePlaceholderClick;
