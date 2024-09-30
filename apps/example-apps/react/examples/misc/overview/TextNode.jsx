import React, { Fragment, memo } from 'react';
import { Handle, useStore, Position, useReactFlow } from '@xyflow/react';

const dimensionAttrs = ['width', 'height'];

export default memo(({ id }) => {
  const { setNodes } = useReactFlow();
  const dimensions = useStore((s) => {
    const node = s.nodeLookup.get('2-3');

    if (
      !node ||
      !node.width ||
      !node.height ||
      !s.edges.some((edge) => edge.target === id)
    ) {
      return null;
    }

    return {
      width: node.width,
      height: node.height,
    };
  });

  const updateDimension = (attr) => (event) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === '2-3') {
          return {
            ...n,
            style: {
              ...n.style,
              [attr]: parseInt(event.target.value),
            },
          };
        }

        return n;
      }),
    );
  };

  return (
    <>
      <div className="wrapper gradient">
        <div className="inner">
          {dimensionAttrs.map((attr) => (
            <Fragment key={attr}>
              <label>node {attr}</label>
              <input
                type="number"
                value={dimensions ? parseInt(dimensions[attr]) : 0}
                onChange={updateDimension(attr)}
                className="nodrag"
                disabled={!dimensions}
              />
            </Fragment>
          ))}
          {!dimensionAttrs && 'no node connected'}
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
});
