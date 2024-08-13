import React, { useCallback, useRef } from 'react';
import {
  addEdge,
  useReactFlow,
  Handle,
  Position,
  reconnectEdge,
} from '@xyflow/react';

export const GhostNode = () => (
  <div style={{ width: 5, height: 5 }}>
    <Handle type="target" position={Position.Top} isConnectable={false} />
  </div>
);

export function useIncompleteEdge() {
  const connectingNodeId = useRef(null);
  const { setNodes, setEdges, screenToFlowPosition } = useReactFlow();

  const onConnectStart = useCallback((_, { nodeId, handleType }) => {
    if (handleType === 'source') {
      connectingNodeId.current = nodeId;
    }
  }, []);

  const onConnect = useCallback(
    (connection) => {
      connectingNodeId.current = null;
      setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges],
  );

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;
      if (!event.target.classList.contains('react-flow__pane')) return;

      const id = `ghost-${Date.now()}`;
      const newNode = {
        id,
        type: 'ghost',
        position: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        data: {},
      };

      const newEdge = {
        id: `${connectingNodeId.current}->${id}`,
        source: connectingNodeId.current,
        target: id,
        reconnectable: 'target',
      };

      setNodes((nodes) => nodes.concat(newNode));
      setEdges((edges) => addEdge(newEdge, edges));
      connectingNodeId.current = null;
    },
    [setNodes, setEdges, screenToFlowPosition],
  );

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      connectingNodeId.current = null;
      setEdges((edges) => reconnectEdge(oldEdge, newConnection, edges));
    },
    [setEdges],
  );

  const onReconnectEnd = useCallback(
    (_, oldEdge, handleType) => {
      if (handleType === 'source') {
        setNodes((nodes) => {
          return nodes.filter((node) => {
            const isGhost = node.type === 'ghost';
            const isTarget = node.id === oldEdge.target;

            return !(isGhost && isTarget);
          });
        });

        setEdges((edges) => edges.filter((edge) => edge.id !== oldEdge.id));
      }
    },
    [setNodes, setEdges],
  );

  const onEdgesDelete = useCallback(
    (deletedEdges) => {
      setNodes((nodes) => {
        return deletedEdges.reduce(
          (acc, edge) =>
            acc.filter((n) => {
              const isGhost = n.type === 'ghost';
              const isSourceOrTarget =
                n.id === edge.source || n.id === edge.target;

              return !(isGhost && isSourceOrTarget);
            }),
          nodes,
        );
      });
    },
    [setNodes],
  );

  return {
    onConnectStart,
    onConnect,
    onConnectEnd,
    onReconnect,
    onReconnectEnd,
    onEdgesDelete,
  };
}
