import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
};

const dragHandleStyle = {
  display: 'inline-block',
  width: 25,
  height: 25,
  backgroundColor: 'teal',
  marginLeft: 5,
  borderRadius: '50%',
};

const onConnect = (params) => console.log('handle onConnect', params);

function DragHandleNode() {
  return (
    <>
      <Handle type="target" position={Position.Left} onConnect={onConnect} />
      <div style={labelStyle}>
        Only draggable here → <span className="custom-drag-handle" style={dragHandleStyle} />
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(DragHandleNode);
