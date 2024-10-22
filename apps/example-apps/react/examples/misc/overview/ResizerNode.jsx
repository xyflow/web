import { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

function ResizerNode({ data }) {
  return (
    <>
      <NodeResizer minWidth={50} minHeight={50} />
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'space-evenly',
          left: 0,
        }}
      >
        <Handle
          style={{ position: 'relative', left: 0, transform: 'none' }}
          id="a"
          type="source"
          position={Position.Bottom}
        />
        <Handle
          style={{ position: 'relative', left: 0, transform: 'none' }}
          id="b"
          type="source"
          position={Position.Bottom}
        />
      </div>
    </>
  );
}

export default memo(ResizerNode);