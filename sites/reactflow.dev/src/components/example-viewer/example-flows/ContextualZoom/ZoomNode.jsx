import React, { memo } from 'react';
import { Handle, useStore, Position } from '@xyflow/react';

const Placeholder = () => (
  <div className="placeholder">
    <div />
    <div />
    <div />
  </div>
);

const zoomSelector = (s) => s.transform[2] >= 0.9;

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
