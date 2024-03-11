import { useState } from 'react';
import { ReactFlow, Background, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import defaultNodes from './nodes.js';
import defaultEdges from './edges.js';

function Flow() {
  const [variant, setVariant] = useState('cross');

  return (
    <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
      <Background color="#ccc" variant={variant} />
      <Panel>
        <div>variant:</div>
        <button onClick={() => setVariant('dots')}>dots</button>
        <button onClick={() => setVariant('lines')}>lines</button>
        <button onClick={() => setVariant('cross')}>cross</button>
      </Panel>
    </ReactFlow>
  );
}

export default Flow;
