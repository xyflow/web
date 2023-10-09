import ReactFlow, { Background, Panel } from 'reactflow';
import 'reactflow/dist/style.css';

import './style.css';

const nodes = [
  {
    id: '1',
    data: { label: 'this is an example flow for the <Panel /> component' },
    position: { x: 0, y: 0 },
  },
];

function Flow() {
  return (
    <ReactFlow nodes={nodes} fitView>
      <Panel position="top-left">top-left</Panel>
      <Panel position="top-center">top-center</Panel>
      <Panel position="top-right">top-right</Panel>
      <Panel position="bottom-left">bottom-left</Panel>
      <Panel position="bottom-center">bottom-center</Panel>
      <Panel position="bottom-right">bottom-right</Panel>
      <Background variant="cross" />
    </ReactFlow>
  );
}

export default Flow;
