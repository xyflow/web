import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';

const emojis = ['🚀', '🔥', '✨'];

function ToolbarNode({ data }) {
  const [emoji, setEmoji] = useState('🚀');

  return (
    <>
      <NodeToolbar isVisible>
        {emojis.map(emoji => (
          <button key={emoji} onClick={() => setEmoji(emoji)} aria-label={`Select emoji ${emoji}`}>
            {emoji}
          </button>
        ))}
      </NodeToolbar>
      <div>
        <div>{emoji}</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div>{data.label}</div>
    </>
  );
}

export default memo(ToolbarNode);
