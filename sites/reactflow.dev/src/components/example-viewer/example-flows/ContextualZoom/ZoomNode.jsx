import React, { memo } from 'react';
import { Handle, useStore, Position } from 'reactflow';

const Placeholder = () => (
  <div className="placeholder">
    <div />
    <div />
    <div />
  </div>
);

const zoomSelector = (s) => s.transform[2] >= 1.5;

export default memo(({ data }) => {
  const showContent = useStore(zoomSelector);

  return (
    <>
      <Handle type="target" position={Position.Left} />
      {showContent ? data.content : <Placeholder />}
      <Handle type="source" position={Position.Right} />
    </>
  );
});
