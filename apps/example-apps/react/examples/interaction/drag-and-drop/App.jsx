import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';

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
  const [type, setType, isDragging, setIsDragging, dragPosition, setDragPosition] = useDnD();
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
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
      console.log('type', type);
    },
    [screenToFlowPosition, type],
  );


  const onTouchMove = useCallback((event) => {
    if (!isDragging) return;
    event.preventDefault();
    
    const touch = event.touches[0];
    setDragPosition({ x: touch.clientX, y: touch.clientY });
  }, [isDragging]);

  const onTouchEnd = useCallback((event) => {
    if (!isDragging || !type) {
      setIsDragging(false);
      return;
    }

    event.preventDefault();
    
    const touch = event.changedTouches[0];
    const position = screenToFlowPosition({
      x: touch.clientX,
      y: touch.clientY,
    });
    
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
    setIsDragging(false);
    setType(null);
  }, [isDragging, type, screenToFlowPosition, setNodes, setType]);

  // Add global touch event listeners
  // This is needed to keep track of the position of the touch event.
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd, { passive: false });
      
      return () => {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      };
    }
  }, [isDragging, onTouchMove, onTouchEnd]);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
      
      {/* Touch drag indicator */}
      {isDragging  && (
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
          {`${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
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
