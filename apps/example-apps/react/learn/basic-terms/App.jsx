import {
  ReactFlow,
  ReactFlowProvider,
  MarkerType,
  Background,
  Panel,
  useViewport,
  useConnection,
} from '@xyflow/react';

import { useCallback, useState } from 'react';
import { AnnotationNode } from './AnnotationNode';
import NodeWrapper from './NodeWrapper';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  annotation: AnnotationNode,
};

const connectionAnnotation = {
  id: 'connection-annotation',
  type: 'annotation',
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
      label: 'This is a "node"',
      arrowStyle: 'arrow-bottom-right',
    },
    position: { x: -65, y: -50 },
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
      label: 'This is a "handle"',
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
      label: 'This is an "edge"',
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
      label: 'Try dragging the handle',
      arrowStyle: 'arrow-top-left',
    },
    position: { x: 430, y: 240 },
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

function ViewportWithAnnotation() {
  const viewport = useViewport();

  return (
    <>
      <NodeWrapper bottom={100} left={0} width={420}>
        <AnnotationNode
          data={{
            label:
              'The viewport is defined by x, y and zoom, which is the transform & scale applied to the flow.',
            arrowStyle:
              'left: 0; bottom: 0; transform: translate(-25px, -15px) rotate(70deg) scale(1, 1);',
          }}
        />
      </NodeWrapper>
      <div
        style={{
          fontFamily: 'monospace',
          background: 'white',
          padding: '5px',
          borderRadius: '3px',
        }}
      >
        <div style={{ fontFamily: 'monospace' }}>
          <div>x: {viewport.x.toFixed(2)}</div>
          <div>y: {viewport.y.toFixed(2)}</div>
          <div>zoom: {viewport.zoom.toFixed(2)}</div>
        </div>
      </div>
    </>
  );
}

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const connection = useConnection();
  const onMouseMove = useCallback(() => {
    if (connection.inProgress) {
      const { from, to } = connection;

      const nodePosition = {
        x: to.x,
        y: to.y,
      };

      setNodes((prevNodes) => {
        const nodeExists = prevNodes.some((node) => node.id === 'connection-annotation');

        if (nodeExists) {
          return prevNodes.map((node) =>
            node.id === 'connection-annotation'
              ? {
                  ...node,
                  position: nodePosition,
                  hidden: Math.abs(to.y - from.y) < 25 && Math.abs(to.x - from.x) < 25,
                }
              : node,
          );
        } else {
          return [
            ...prevNodes,
            {
              ...connectionAnnotation,
              position: nodePosition,
              hidden: Math.abs(to.y - from.y) < 25 && Math.abs(to.x - from.x) < 25,
            },
          ];
        }
      });
    }
  }, [connection]);

  const onConnectEnd = useCallback(() => {
    setNodes((prevNodes) =>
      prevNodes.filter((node) => node.id !== 'connection-annotation'),
    );
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }} onMouseMove={onMouseMove}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnectEnd={onConnectEnd}
        fitView
        preventScrolling={false}
      >
        <Background />
        <Panel position="bottom-left">
          <ViewportWithAnnotation />
        </Panel>
      </ReactFlow>
    </div>
  );
}

function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;
