import { useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  NodeOrigin,
  Position,
  ReactFlowProvider,
  useNodesInitialized,
  useReactFlow,
} from 'reactflow';

import {
  Input,
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from 'xy-ui';

const nodes = [
  {
    id: '1',
    type: 'creator',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    className: 'bg-slate-800 rounded-md',
  },
];

const edges = [];

function CreatorNode() {
  const { setNodes, setEdges } = useReactFlow();
  const [shapeValue, setShapeValue] = useState('rectangle');

  const onSubmit = (evt) => {
    evt.preventDefault();
    const { name, shape } = evt.target;

    setNodes((nds) => [
      ...nds,
      {
        id: '2',
        data: { label: name.value },
        position: { x: 0, y: 250 },
        className:
          shape.value === 'circle' ? 'rounded-full h-[100px] w-[100px]' : '',
      },
    ]);

    setEdges([{ id: '1-2', source: '1', target: '2' }]);
  };

  return (
    <>
      <div className="p-4 rounded-md text-white border border-slate-400">
        <div className="font-bold text-center mb-2">Node Creator</div>
        <form onSubmit={onSubmit}>
          <label className="text-xs block">Name</label>
          <Input
            name="name"
            type="text"
            className="rounded-sm text-black"
            required
          />
          <label className="mt-2 text-xs block">Shape</label>
          <Select name="shape" value={shapeValue} onValueChange={setShapeValue}>
            <SelectTrigger className="rounded-sm">
              <SelectValue placeholder="Rectangle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rectangle">Rectangle</SelectItem>
              <SelectItem value="circle">Circle</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="submit"
            className="block w-full mt-4 font-bold py-2 rounded-sm !bg-slate-600 text-white px-4"
          >
            Add
          </button>
        </form>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

const nodeTypes = {
  creator: CreatorNode,
};

const proOptions = { hideAttribution: true };
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const fitViewOptions = { padding: 0.2 };

function Flow() {
  const nodesInitialized = useNodesInitialized();
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (nodesInitialized) {
      fitView(fitViewOptions);
    }
  }, [nodesInitialized, fitView]);

  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={fitViewOptions}
      id="b"
      className="bg-slate-950"
      proOptions={proOptions}
      nodeOrigin={nodeOrigin}
    >
      <Background />
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
