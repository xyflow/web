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
  ColorMode,
} from '@xyflow/react';
import { Input } from '../../ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '../../ui/select';
import { useTheme } from 'nextra-theme-docs';

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

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const shape = form.elements.namedItem('shape') as HTMLSelectElement;

    setNodes((nds) => [
      ...nds,
      {
        id: '2',
        data: { label: name.value },
        position: { x: 0, y: 250 },
        className:
          shape.value === 'circle'
            ? 'font-mono h-[110px] w-[110px] rounded-full flex items-center justify-center text-center px-3 text-xs leading-snug break-words select-none text-gray-100 bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f] border border-gray-600 shadow-[0_8px_24px_rgba(0,0,0,0.35)] '
            : 'rounded font-mono text-gray-100 bg-gradient-to-b from-[#3a3a3a] to-[#1f1f1f] border border-gray-600 shadow-[0_8px_24px_rgba(0,0,0,0.35)]',
      },
    ]);

    setEdges([{ id: '1-2', source: '1', target: '2' }]);
  };

  return (
    <NodeWrapper
      className="rounded-lg border border-gray-600 bg-[#1e1e1e] shadow-md"
      title="Node Creator"
    >
      <form onSubmit={onSubmit}>
        <label className="mb-1 block font-mono text-xs text-gray-400">Name</label>
        <Input
          name="name"
          type="text"
          required
          className="w-full rounded-sm border-gray-700 bg-[#323232] font-mono text-xs text-gray-400"
        />
        <label className="mb-1 mt-2 block font-mono text-xs text-gray-400">Shape</label>
        <Select name="shape" value={shapeValue} onValueChange={setShapeValue}>
          <SelectTrigger className="w-full rounded-sm border border-gray-700 bg-[#323232] bg-gray-800 font-mono text-xs text-gray-400">
            <SelectValue placeholder="Rectangle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rectangle">Rectangle</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
          </SelectContent>
        </Select>
        <button
          type="submit"
          className="bg-primary mt-4 w-full rounded-md bg-gray-700 px-4 py-2 font-mono text-xs text-white hover:bg-gray-600"
        >
          Add
        </button>
      </form>
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-2.5 w-5 rounded border-none bg-gray-500"
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
  const { theme } = useTheme();
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
      className="bg-[#141414] text-black"
      defaultNodes={nodes}
      defaultEdges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={fitViewOptions}
      proOptions={proOptions}
      nodeOrigin={nodeOrigin}
      preventScrolling={false}
      colorMode={theme as ColorMode}
    >
      <Controls
        position="top-right"
        showInteractive={false}
        showFitView={false}
        className="overflow-hidden rounded-lg"
      ></Controls>
    </ReactFlow>
  );
}

export const FlowB: FC = () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
