import {
  ReactFlow,
  ReactFlowProvider,
  MarkerType,
  Background,
  Panel,
  useViewport,
} from '@xyflow/react';

import { useCallback, useState } from 'react';
import { AnnotationNode } from './AnnotationNode';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  annotation: AnnotationNode,
};

const connectionAnnotation = {
  id: 'connection-annotation',
  type: 'annotation',
  draggable: false,
  selectable: false,
  data: {
    label: 'this is a "connection"',
    arrowStyle: 'arrow-top-left',
  },
  position: { x: 0, y: 0 },
};

const initialNodes = [
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'This is a "node".',
      arrowStyle: 'arrow-bottom-right',
    },
    position: { x: -80, y: -50 },
  },
  {
    id: '1-1',
    type: 'default',
    data: {
      label: 'node label',
    },
    position: { x: 150, y: 0 },
  },
  {
    id: 'annotation-2',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'This is a "handle".',
      arrowStyle: 'arrow-top-left',
    },
    position: { x: 235, y: 35 },
  },
  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'This is an "edge".',
      arrowStyle: 'arrow-top-right',
    },
    position: { x: 20, y: 120 },
  },
  {
    id: '1-2',
    type: 'default',
    data: {
      label: 'node label',
    },
    position: { x: 350, y: 200 },
  },
  {
    id: 'annotation-4',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label: 'Try dragging the handle.',
      arrowStyle: 'arrow-top-left',
    },
    position: { x: 430, y: 230 },
  },
  {
    id: 'viewport-annotation',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      label:
        'The viewport is defined by x, y and zoom, which is the transform & scale applied to the flow',
      arrowStyle: 'arrow-bottom-left',
    },
    position: { x: 10, y: 320 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    label: 'edge label',
    type: 'smoothstep',
  },
  {
    id: 'e2-2',
    source: '1-2',
    target: '2-2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

function ViewportDisplay() {
  const { x, y, zoom } = useViewport();

  return (
    <div
      style={{
        fontFamily: 'monospace',
        background: 'white',
        padding: '5px',
        borderRadius: '3px',
      }}
    >
      <div>x: {x.toFixed(2)}</div>
      <div>y: {y.toFixed(2)}</div>
      <div>zoom: {zoom.toFixed(2)}</div>
    </div>
  );
}

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [connectionInProgress, setConnectionInProgress] = useState(false);

  const onMouseMove = useCallback(
    (event) => {
      if (connectionInProgress) {
        const { clientX, clientY } = event;
        const { top, left } = event.currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        setNodes((prevNodes) => {
          return prevNodes.map((node) =>
            node.id === 'connection-annotation'
              ? {
                  ...node,
                  position: { x: x - 100, y: y - 75 },
                  hidden: false,
                }
              : node,
          );
        });
      }
    },
    [connectionInProgress],
  );

  const onConnectStart = useCallback(() => {
    setConnectionInProgress(true);

    setNodes((prevNodes) => {
      const hasAnnotation = prevNodes.some((node) => node.id === 'connection-annotation');

      if (hasAnnotation) {
        return prevNodes;
      }

      return [
        ...prevNodes,
        {
          ...connectionAnnotation,
          position: { x: 100, y: 100 },
          hidden: true,
        },
      ];
    });
  }, []);

  const onConnectEnd = useCallback(() => {
    setConnectionInProgress(false);

    setNodes((prevNodes) =>
      prevNodes.filter((node) => node.id !== 'connection-annotation'),
    );
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} onMouseMove={onMouseMove}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          fitView
          preventScrolling={false}
          style={{ backgroundColor: '#F7F9FB' }}
        >
          <Background />
          <Panel position="bottom-left">
            <ViewportDisplay />
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
