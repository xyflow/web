import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  MiniMap,
  Controls,
  Panel,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import ColorSelectorNode from './ColorSelectorNode';

const initColor = '#ff0071';

const snapGrid = [20, 20];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedColor, setSelectedColor] = useState(initColor);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== '2') {
            return node;
          }

          const color = event.target.value;

          setSelectedColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        }),
      );
    };

    setNodes([
      {
        id: '1',
        type: 'input',
        data: { label: 'An input node' },
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
      },
      {
        id: '2',
        type: 'selectorNode',
        data: { onChange: onChange, color: initColor },
        position: { x: 300, y: 50 },
      },
      {
        id: '3',
        type: 'output',
        data: { label: 'Output A' },
        position: { x: 650, y: 25 },
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'output',
        data: { label: 'Output B' },
        position: { x: 650, y: 100 },
        targetPosition: 'left',
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        animated: true,
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        animated: true,
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [],
  );
  return (
    <ReactFlow
      colorMode="system"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
    >
      <Background />
      <MiniMap />
      <Controls />
      <Panel position="top-right">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 8,
            background: 'var(--xy-controls-button-background-color, #fff)',
            border: '1px solid var(--xy-controls-button-border-color, #ddd)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 16,
              height: 16,
              borderRadius: '999px',
              background: selectedColor,
              border: '1px solid rgba(0, 0, 0, 0.2)',
            }}
          />
          <span>
            Selected color:{' '}
            <code style={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
              {selectedColor}
            </code>
          </span>
        </div>
      </Panel>
    </ReactFlow>
  );
};

export default CustomNodeFlow;
