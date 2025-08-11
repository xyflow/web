import {
  Background,
  Connection,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { useCallback, useEffect, useRef } from 'react';

import '@xyflow/react/dist/style.css';

import { DnDProvider, useDnD } from './DnDContext';
import Sidebar from './Sidebar';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const { type, setType, isDragging, setIsDragging, dragPosition, setDragPosition } =
    useDnD();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      console.log('onPointerMove', event);
      if (!isDragging) return;
      event.preventDefault();

      setDragPosition({ x: event.clientX, y: event.clientY });
    },
    [isDragging],
  );

  const onPointerUp = useCallback(
    (event: PointerEvent) => {
      if (!isDragging || !type) {
        setIsDragging(false);
        return;
      }

      (event.target as HTMLElement).releasePointerCapture(event.pointerId);

      // Use elementFromPoint to get the actual element under the pointer
      const elementUnderPointer = document.elementFromPoint(event.clientX, event.clientY);
      const isDroppingOnFlow = elementUnderPointer?.closest('.react-flow');

      console.log('onPointerUp', isDroppingOnFlow);
      event.preventDefault();

      // Only add the node if dropping on the flow area
      if (isDroppingOnFlow) {
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }

      setIsDragging(false);
      setType(null);
    },
    [isDragging, type, screenToFlowPosition, setNodes, setType],
  );

  // Add global touch event listeners
  // This is needed to keep track of the position of the touch event.
  useEffect(() => {
    if (isDragging) {
      console.log('useEffect ', isDragging);
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);

      return () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };
    }
  }, [isDragging, onPointerMove, onPointerUp]);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />

      {/* Touch drag indicator */}
      {isDragging && (
        <div
          className={`dndnode ${type}`}
          style={{
            position: 'fixed',
            left: dragPosition.x - 25,
            top: dragPosition.y - 25,
            pointerEvents: 'none',
            zIndex: 1000,
            fontSize: '12px',
          }}
        >
          {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
        </div>
      )}
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
