import React from 'react';
import { useDnD } from './useDnD';

export default () => {
  const { onPointerDown } = useDnD();

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onPointerDown={(event) => onPointerDown(event, 'input')}
      >
        Input Node
      </div>
      <div className="dndnode" onPointerDown={(event) => onPointerDown(event, 'default')}>
        Default Node
      </div>
      <div
        className="dndnode output"
        onPointerDown={(event) => onPointerDown(event, 'output')}
      >
        Output Node
      </div>
    </aside>
  );
};
