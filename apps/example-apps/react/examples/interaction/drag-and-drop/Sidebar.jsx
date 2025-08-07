import React from 'react';
import { useDnD } from './DnDContext';

export default ({  }) => {
  const [_, setType, isDragging, setIsDragging, dragPosition, setDragPosition] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onTouchStart = (event, nodeType) => {
    setType(nodeType);
    setIsDragging(true);
    const touch = event.touches[0];
    setDragPosition({ x: touch.clientX, y: touch.clientY });
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div 
        className="dndnode input" 
        onDragStart={(event) => onDragStart(event, 'input')} 
        onTouchStart={(event) => onTouchStart(event, 'input')}
        draggable
      >
        Input Node
      </div>
      <div 
        className="dndnode" 
        onDragStart={(event) => onDragStart(event, 'default')} 
        onTouchStart={(event) => onTouchStart(event, 'default')}
        draggable
      >
        Default Node
      </div>
      <div 
        className="dndnode output" 
        onDragStart={(event) => onDragStart(event, 'output')} 
        onTouchStart={(event) => onTouchStart(event, 'output')}
        draggable
      >
        Output Node
      </div>
    </aside>
  );
};
