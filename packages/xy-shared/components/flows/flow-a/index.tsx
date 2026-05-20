'use client';

import { FC } from 'react';
import { ReactFlow, Background, Controls, ColorMode } from '@xyflow/react';
import { useTheme } from 'nextra-theme-docs';

const nodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    style: { fontWeight: 'bold' },
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 150, y: 100 },
    style: { fontWeight: 'bold' },
  },
];
const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
];

const proOptions = { hideAttribution: true };
const fitViewOptions = { padding: 0.4 };

export const FlowA: FC = () => {
  const { theme } = useTheme();

  return (
    <ReactFlow
      id="a"
      className="text-black"
      defaultNodes={nodes}
      defaultEdges={edges}
      fitView
      fitViewOptions={fitViewOptions}
      proOptions={proOptions}
      preventScrolling={false}
      colorMode={theme as ColorMode}
    >
      <Background />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
};
