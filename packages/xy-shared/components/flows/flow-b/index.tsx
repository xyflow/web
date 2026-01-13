'use client';

import { FC, useEffect, useState } from 'react';
import { NodeWrapper } from '../../node-wrapper';
import {
  ReactFlow,
  Controls,
  Handle,
  NodeOrigin,
  Position,
  ReactFlowProvider,
  useNodesInitialized,
  useReactFlow,
  Node,
  Edge,
} from '@xyflow/react';
import { Input } from '../../ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '../../ui/select';

const nodes: Node[] = [
  {
    id: '1',
    type: 'creator',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
  },
];

const edges: Edge[] = [];

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
    <NodeWrapper
      className="border border-gray-600 rounded-lg bg-[#1e1e1e] shadow-md"
      title="Node Creator"
    >
      <form onSubmit={onSubmit}>
        <label className="block text-xs font-mono text-gray-400 mb-1">Name</label>
        <Input
          name="name"
          type="text"
          required
          className="rounded-sm text-xs font-mono border-gray-700 text-gray-400 bg-[#323232] w-full"
        />
        <label className="block text-xs font-mono text-gray-400 mb-1 mt-2">Shape</label>
        <Select name="shape" value={shapeValue} onValueChange={setShapeValue}>
          <SelectTrigger className="rounded-sm text-xs font-mono border border-gray-700 bg-gray-800 bg-[#323232] text-gray-400 w-full">
            <SelectValue placeholder="Rectangle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rectangle">Rectangle</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
          </SelectContent>
        </Select>
        <button
          type="submit"
          className="mt-4 bg-gray-700 text-white text-xs font-mono py-2 px-4 rounded-md bg-primary hover:bg-gray-600 w-full"
        >
          Add
        </button>
      </form>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-5 h-2.5 rounded bg-gray-500 border-none"
      />
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
      className="bg-[#141414]"
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
        className="rounded-lg overflow-hidden"
      ></Controls>
    </ReactFlow>
  );
}

export const FlowB: FC = () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
