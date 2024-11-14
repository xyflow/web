import React, { useCallback } from 'react';
import {
  addEdge,
  useReactFlow,
  Handle,
  Position,
  reconnectEdge,
} from '@xyflow/react';

export const GhostNode = () => (
  <div style={{ width: 5, height: 5 }}>
    <Handle
      type="target"
      position={Position.Top}
      isConnectable={false}
      style={{ background: 'white' }}
    />
  </div>
);

export function useIncompleteEdge() {
  const { setNodes, setEdges, screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges],
  );

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      if (
        connectionState.isValid ||
        connectionState.fromHandle.type === 'target'
      ) {
        return;
      }

      const fromNodeId = connectionState.fromNode.id;
      const id = `ghost-${Date.now()}`;
      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : event;
      const newNode = {
        id,
        type: 'ghost',
        position: screenToFlowPosition({
          x: clientX,
          y: clientY,
        }),
        data: {},
      };

      const newEdge = {
        id: `${fromNodeId}->${id}`,
        source: fromNodeId,
        target: id,
        reconnectable: 'target',
      };

      setNodes((nodes) => nodes.concat(newNode));
      setEdges((edges) => addEdge(newEdge, edges));
    },
    [setNodes, setEdges, screenToFlowPosition],
  );

  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((edges) => reconnectEdge(oldEdge, newConnection, edges)),
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
    onConnect,
    onConnectEnd,
    onReconnect,
    onReconnectEnd,
    onEdgesDelete,
  };
}
