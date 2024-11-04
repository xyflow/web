import React, { useEffect, useState, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

export default function RotatableNode({
  id,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data,
}) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  return (
    <>
      <div
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        className="node"
      >
        <div ref={rotateControlRef} className={`nodrag rotateHandle`} />
        <div>{data?.label}</div>
        <Handle position={sourcePosition} type="source" />
        <Handle position={targetPosition} type="target" />
      </div>
    </>
  );
}
