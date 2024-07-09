import { memo } from 'react';
import { Position, NodeProps, Handle, useReactFlow } from '@xyflow/react';

function TextNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow();

  return (
    <div
      style={{
        background: '#eee',
        color: '#222',
        padding: 10,
        fontSize: 12,
        borderRadius: 10,
      }}
    >
      <div>node {id}</div>
      <div style={{ marginTop: 5 }}>
        <input
          onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
          value={data.text}
          style={{ display: 'block' }}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(TextNode);
