import { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
} from '@xyflow/react';
import { Lasso } from './Lasso';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
  },
  {
    id: '2',
    position: { x: 300, y: 0 },
    data: { label: 'World' },
  },
];

const initialEdges = [];

export default function LassoSelectionFlow() {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const [partial, setPartial] = useState(false);
  const [isLassoActive, setIsLassoActive] = useState(true);

  return (
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
      {isLassoActive && <Lasso partial={partial} />}

      <Panel position="top-left" className="lasso-controls">
        <div className="xy-theme__button-group">
          <button
            className={`xy-theme__button ${isLassoActive ? 'active' : ''}`}
            onClick={() => setIsLassoActive(true)}
          >
            Lasso Mode
          </button>
          <button
            className={`xy-theme__button ${!isLassoActive ? 'active' : ''}`}
            onClick={() => setIsLassoActive(false)}
          >
            Selection Mode
          </button>
        </div>

        <label>
          <input
            type="checkbox"
            checked={partial}
            onChange={() => setPartial((p) => !p)}
            className="xy-theme__checkbox"
          />
          Partial selection
        </label>
      </Panel>
    </ReactFlow>
  );
}
