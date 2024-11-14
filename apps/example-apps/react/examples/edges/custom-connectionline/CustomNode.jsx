import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div style={{ padding: 25}} >
        <div>Node</div>
        <Handle
          type="source"
          id="red"
          position={Position.Bottom}
          style={{ ...DEFAULT_HANDLE_STYLE, left: '15%', background: 'red' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="blue"
          style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: 'blue' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="orange"
          style={{ ...DEFAULT_HANDLE_STYLE, left: '85%', background: 'orange' }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});
