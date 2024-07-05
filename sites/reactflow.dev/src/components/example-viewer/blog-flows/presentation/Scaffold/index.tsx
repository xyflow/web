import { ReactFlow, ReactFlowProvider } from 'reactflow';
import { Slide } from './Slide';

import 'reactflow/dist/style.css';
import './index.css';

const nodeTypes = {
  slide: Slide,
};

function App() {
  const nodes = [
    { id: '0', type: 'slide', position: { x: 0, y: 0 }, data: {} },
  ];

  return (
    <ReactFlow nodes={nodes} nodeTypes={nodeTypes} minZoom={0.1} fitView />
  );
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
