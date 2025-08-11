import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const { setType, setIsDragging, setDragPosition } = useDnD();

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>, nodeType: string) => {
    console.log('onPointerDown', event);
    event.preventDefault();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    setType(nodeType);
    setIsDragging(true);

    setDragPosition({ x: event.clientX, y: event.clientY });
  };

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
