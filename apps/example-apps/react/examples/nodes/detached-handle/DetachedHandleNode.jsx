import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right}>
        <button className="detached-handle">➡️</button>
      </Handle>
    </>
  );
});
