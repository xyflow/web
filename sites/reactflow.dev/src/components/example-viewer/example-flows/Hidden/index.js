import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: 'hidden-1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  { id: 'hidden-2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: 'hidden-3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: 'hidden-4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
  { id: 'hidden-e1-2', source: 'hidden-1', target: 'hidden-2' },
  { id: 'hidden-e1-3', source: 'hidden-1', target: 'hidden-3' },
  { id: 'hidden-e3-4', source: 'hidden-3', target: 'hidden-4' },
];

const hide = (hidden) => (nodeOrEdge) => {
  nodeOrEdge.hidden = hidden;
  return nodeOrEdge;
};

const HiddenFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hidden, setHidden] = useState(false);

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  useEffect(() => {
    setNodes((nds) => nds.map(hide(hidden)));
    setEdges((eds) => eds.map(hide(hidden)));
  }, [hidden]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <MiniMap />
      <Controls />

      <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
        <div>
          <label htmlFor="ishidden">
            isHidden
            <input
              id="ishidden"
              type="checkbox"
              checked={hidden}
              onChange={(event) => setHidden(event.target.checked)}
              className="react-flow__ishidden"
            />
          </label>
        </div>
      </div>
    </ReactFlow>
  );
};

export default HiddenFlow;
