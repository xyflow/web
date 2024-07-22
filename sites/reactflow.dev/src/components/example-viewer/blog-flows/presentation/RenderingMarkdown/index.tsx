import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import { Slide, SLIDE_WIDTH } from './Slide';

import 'reactflow/dist/style.css';
import './index.css';

const nodeTypes = {
  slide: Slide,
};

function App() {
  const nodes = [
    {
      id: '0',
      type: 'slide',
      position: { x: 0, y: 0 },
      data: { source: '# Hello, React Flow!' },
    },
    {
      id: '1',
      type: 'slide',
      position: { x: SLIDE_WIDTH, y: 0 },
      data: { source: '- these are\n- some\n- bullet points!' },
    },
    {
      id: '2',
      type: 'slide',
      position: { x: SLIDE_WIDTH * 2, y: 0 },
      data: {
        source:
          "It's markdown so we can write **bold text** or `code snippets` too!",
      },
    },
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
