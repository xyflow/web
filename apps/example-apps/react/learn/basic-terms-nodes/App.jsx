import { ReactFlow, ReactFlowProvider, MarkerType, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { AnnotationNode } from './AnnotationNode';

const nodeTypes = {
  annotation: AnnotationNode,
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
      label: 'this is a "handle"',
      arrowStyle: 'arrow-bottom-left',
    },
    position: { x: 230, y: 30 },
  },
  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'this is an "edge"',
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
      label: 'try dragging the handle',
      arrowStyle: 'arrow-top-left',
    },
    position: { x: 450, y: 220 },
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

function Flow() {
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          defaultNodes={initialNodes}
          defaultEdges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          preventScrolling={false}
          style={{ backgroundColor: '#F7F9FB' }}
        />
        <Background />
      </ReactFlowProvider>
    </div>
  );
}

export default Flow;
