import React, { Fragment, memo } from 'react';
import { Handle, useStore, Position, useReactFlow } from '@xyflow/react';

const dimensionAttrs = ['width', 'height'];

export default memo(({ id }) => {
  const { setNodes } = useReactFlow();
  const dimensions = useStore((s) => {
    const node = s.nodeLookup.get('2-3');
    if (
      !node ||
      !node.measured.width ||
      !node.measured.height ||
      !s.edges.some((edge) => edge.target === id)
    ) {
      return null;
    }
    return {
      width: node.measured.width,
      height: node.measured.height,
    };
  });
  const updateDimension = (attr) => (event) => {
    const value = parseInt(event.target.value);

    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === '2-3') {
          const parentNode = nds.find((node) => node.id === '2-1');
          const parentWidth = parentNode ? parentNode.style.width : Infinity;
          const parentHeight = parentNode ? parentNode.style.height : Infinity;

          const currentNode = nds.find((node) => node.id === '2-3');
          const currentPosX = currentNode.position.x;
          const currentPosY = currentNode.position.y;

          const maxWidth = Math.max(parentWidth - currentPosX, 0);
          const maxHeight = Math.max(parentHeight - currentPosY, 0);

          const newSize = {
            width: attr === 'width' ? Math.min(value, maxWidth) : currentNode.style.width,
            height:
              attr === 'height' ? Math.min(value, maxHeight) : currentNode.style.height,
          };

          return {
            ...n,
            style: {
              ...n.style,
              [attr]: newSize[attr],
            },
          };
        }

        return n;
      }),
    );
  };

  return (
    <div>
      {dimensionAttrs.map((attr) => (
        <Fragment key={attr}>
          <label>Node {attr}</label>
          <input
            type="number"
            value={dimensions ? parseInt(dimensions[attr]) : 0}
            onChange={updateDimension(attr)}
            className="text-input-node__input xy-theme__input nodrag"
            disabled={!dimensions}
          />
        </Fragment>
      ))}
      {!dimensionAttrs && 'no node connected'}
      <Handle type="target" position={Position.Top} className="custom-handle" />
    </div>
  );
});
