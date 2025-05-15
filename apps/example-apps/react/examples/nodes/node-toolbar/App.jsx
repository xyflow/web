import { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  Panel,
  NodeToolbar,
  Position,
  useNodesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    type: 'node-with-toolbar',
    data: { label: 'Select me to show the toolbar' },
  },
];

const nodeTypes = {
  'node-with-toolbar': NodeWithToolbar,
};

function NodeWithToolbar({ data }) {
  return (
    <>
      <NodeToolbar
        isVisible={data.forceToolbarVisible || undefined}
        position={data.toolbarPosition}
      >
        <button>cut</button>
        <button>copy</button>
        <button>paste</button>
      </NodeToolbar>
      <div>{data?.label}</div>
    </>
  );
}

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const setPosition = useCallback(
    (pos) =>
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          data: { ...node.data, toolbarPosition: pos },
        })),
      ),
    [setNodes],
  );
  const forceToolbarVisible = useCallback((enabled) =>
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        data: { ...node.data, forceToolbarVisible: enabled },
      })),
    ),
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
        preventScrolling={false}
      >
        <Panel>
          <h3>Node Toolbar position:</h3>
          <button className="xy-theme__button" onClick={() => setPosition(Position.Top)}>
            top
          </button>
          <button
            className="xy-theme__button"
            onClick={() => setPosition(Position.Right)}
          >
            right
          </button>
          <button
            className="xy-theme__button"
            onClick={() => setPosition(Position.Bottom)}
          >
            bottom
          </button>
          <button className="xy-theme__button" onClick={() => setPosition(Position.Left)}>
            left
          </button>
          <h3>Override Node Toolbar visibility</h3>
          <label>
            <input
              type="checkbox"
              onChange={(e) => forceToolbarVisible(e.target.checked)}
              className="xy-theme__checkbox"
            />
            <span>Always show toolbar</span>
          </label>
        </Panel>
        <Background />
      </ReactFlow>
    </ReactFlowProvider>
  );
}

export default Flow;
