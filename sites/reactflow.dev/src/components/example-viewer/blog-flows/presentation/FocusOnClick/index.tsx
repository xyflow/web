import { useCallback, useMemo } from 'react';
import ReactFlow, {
  NodeMouseHandler,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import { Slide } from './Slide';
import { slides, slidesToElements } from './slides';

import 'reactflow/dist/style.css';
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
    />
  );
}

export default () => (
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
);
