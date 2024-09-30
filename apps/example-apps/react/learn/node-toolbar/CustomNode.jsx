import { memo } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';

const CustomNode = ({ data }) => {
  return (
    <>
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
      >
        <button>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
      <div style={{ padding: '10px 20px' }}>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default memo(CustomNode);
