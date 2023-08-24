import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Position,
} from 'reactflow';

const defaultNodeOptions = {
  targetPosition: Position.Left,
  sourcePosition: Position.Right,
};

const nodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'A' },
    position: { x: 0, y: 0 },
    style: {
      width: 80,
      backgroundColor: '#0050ff',
      borderColor: 'white',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    ...defaultNodeOptions,
  },
  {
    id: '2',
    data: { label: 'B' },
    position: { x: 150, y: -100 },
    style: {
      width: 80,
      backgroundColor: '#a845d0',
      borderColor: 'white',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    ...defaultNodeOptions,
  },
  {
    id: '3',
    data: { label: 'C' },
    position: { x: 300, y: 0 },
    style: {
      width: 80,
      backgroundColor: '#ff2e8b',
      borderColor: 'white',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    ...defaultNodeOptions,
  },
];

const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
  },
];

const proOptions = { hideAttribution: true };

export default function Flow() {
  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      fitView
      id="c"
      proOptions={proOptions}
    >
      <Background />
      <Controls showInteractive={false} />
      <MiniMap style={{ height: 100 }} />
    </ReactFlow>
  );
}
