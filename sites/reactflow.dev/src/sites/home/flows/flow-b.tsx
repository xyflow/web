import { useEffect, useState } from 'react';
import ReactFlow, {
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
  NodeWrapper,
} from 'xy-ui';

const nodes = [
  {
    id: '1',
    type: 'creator',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
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
          shape.value === 'circle'
            ? 'font-mono rounded-full h-[100px] w-[100px]'
            : 'font-mono',
      },
    ]);

    setEdges([{ id: '1-2', source: '1', target: '2' }]);
  };

  return (
    <NodeWrapper title="Node Creator">
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <Input name="name" type="text" required />
        <label className="mt-2">Shape</label>
        <Select name="shape" value={shapeValue} onValueChange={setShapeValue}>
          <SelectTrigger className="rounded-sm text-xs font-mono border border-[#3C3C3C] !bg-[#323232] text-[#AFAFAF]">
            <SelectValue placeholder="Rectangle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rectangle">Rectangle</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
          </SelectContent>
        </Select>
        <button type="submit" className="mt-4 !bg-primary">
          Add
        </button>
      </form>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  );
}

const nodeTypes = {
  creator: CreatorNode,
};

const proOptions = { hideAttribution: true };
const nodeOrigin: NodeOrigin = [0.5, 0.5];
const fitViewOptions = { padding: 0.5 };

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
      id="b"
      className="darkflow home-flow-b"
      defaultNodes={nodes}
      defaultEdges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={fitViewOptions}
      proOptions={proOptions}
      nodeOrigin={nodeOrigin}
      preventScrolling={false}
    >
      <Controls
        position="top-right"
        showInteractive={false}
        showFitView={false}
      />
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
