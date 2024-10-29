import { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

function ResizerNode({ data }) {
  return (
    <>
      <NodeResizer minWidth={50} minHeight={50} />
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <div className="resizer-node__handles">
        <Handle
          className="resizer-node__handle"
          id="a"
          type="source"
          position={Position.Bottom}
        />
        <Handle
          className="resizer-node__handle"
          id="b"
          type="source"
          position={Position.Bottom}
        />
      </div>
    </>
  );
}

export default memo(ResizerNode);
