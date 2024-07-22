import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  NodeMouseHandler,
  ReactFlowProvider,
  useReactFlow,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import { Slide } from './Slide';
import { slides, slidesToElements } from './slides';

import '@xyflow/react/dist/style.css';
import './index.css';

const nodeTypes = {
  slide: Slide,
};

function App() {
  const start = '01';
  const { fitView } = useReactFlow();
  const { nodes, edges } = useMemo(() => slidesToElements(start, slides), []);

  const handleNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      fitView({ nodes: [{ id: node.id }], duration: 150 });
    },
    [fitView],
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      minZoom={0.1}
      fitView
      fitViewOptions={{ nodes: [{ id: start }] }}
      onNodeClick={handleNodeClick}
    >
      <Background color="#f2f2f2" variant={BackgroundVariant.Lines} />
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
