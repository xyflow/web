import ReactFlow, { Background, Controls } from 'reactflow';

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

export default function Flow() {
  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      fitView
      id="a"
      proOptions={proOptions}
    >
      <Background />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}
