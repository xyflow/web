import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';

const labelStyle = {
  position: 'absolute',
  color: '#555',
  bottom: -15,
  fontSize: 8,
};

function ToolbarNode({ data }) {
  const [emoji, setEmoji] = useState(() => '🚀');

  return (
    <>
      <NodeToolbar isVisible>
        <button onClick={() => setEmoji('🚀')}>🚀</button>
        <button onClick={() => setEmoji('🔥')}>🔥</button>
        <button onClick={() => setEmoji('✨')}>✨</button>
      </NodeToolbar>
      <div>
        <div>{emoji}</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={labelStyle}>{data.label}</div>
    </>
  );
}

export default memo(ToolbarNode);
