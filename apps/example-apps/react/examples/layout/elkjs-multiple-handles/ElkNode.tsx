import { Handle, type NodeProps, Position } from '@xyflow/react';

import { type ElkNode as ElkNodeType } from './nodes';

export default function ElkNode({ data }: NodeProps<ElkNodeType>) {
  return (
    <>
      <div className="handles targets">
        {data.targetHandles.map((handle) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type="target"
            position={Position.Left}
          />
        ))}
      </div>
      <div className="label">{data.label}</div>
      <div className="handles sources">
        {data.sourceHandles.map((handle) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type="source"
            position={Position.Right}
          />
        ))}
      </div>
    </>
  );
}
