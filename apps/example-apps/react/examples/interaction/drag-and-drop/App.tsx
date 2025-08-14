import { useCallback, useContext, useEffect } from 'react';
import {
  Background,
  Connection,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  XYPosition,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import DnDContext, { DnDProvider, DragGhost, useDnD } from './useDnD';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];

// This is a simple ID generator for the nodes.
// You can customize this to use your own ID generation logic.
let id = 0;
const getId = () => `dndnode_${id++}`;

function DnDFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const { setDropAction } = useDnD();

  const addNewNode = useCallback((position: XYPosition) => {
    // Here, we create a new node and add it to the flow.
    // You can customize the behavior of what happens when a node is dropped on the flow here.
    const newNode = {
      id: getId(),
      type: 'default',
      position,
      data: { label: `New Node` },
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);

  // When we initialize the app, we set the drop action to add a new node.
  useEffect(() => {
    setDropAction(addNewNode);
  }, []);

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper">
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
      <DragGhost />
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
