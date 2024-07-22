import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import { Slide } from './Slide';

import '@xyflow/react/dist/style.css';
import './index.css';

const nodeTypes = {
  slide: Slide,
};

function App() {
  const nodes = [
    { id: '0', type: 'slide', position: { x: 0, y: 0 }, data: {} },
  ];

  return (
    <ReactFlow nodes={nodes} nodeTypes={nodeTypes} minZoom={0.1} fitView>
      <Background color="#f2f2f2" variant={BackgroundVariant.Lines} />
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
