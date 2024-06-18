import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const { Top, Bottom, Left, Right } = Position;

const nodeStyle = {
  height: 36,
  minWidth: 150,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid black',
  borderRadius: '4px',
};

export default memo(({ data }) => {
  const { isSpouse, isSibling, label, direction } = data;

  const isTreeHorizontal = direction === 'LR';

  const getTargetPosition = () => {
    if (isSpouse) {
      return isTreeHorizontal ? Top : Left;
    } else if (isSibling) {
      return isTreeHorizontal ? Bottom : Right;
    }
    return isTreeHorizontal ? Left : Top;
  };

  const isRootNode = nodeInfo?.isRoot;
  const hasChildren = !!nodeInfo?.children?.length;
  const hasSiblings = !!nodeInfo?.siblings?.length;
  const hasSpouses = !!nodeInfo?.spouses?.length;

  return (
    <div className="nodrag">
      {/* For children */}
      {hasChildren && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Right : Bottom}
          id={isTreeHorizontal ? Right : Bottom}
        />
      )}

      {/* For spouses */}
      {hasSpouses && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Bottom : Right}
          id={isTreeHorizontal ? Bottom : Right}
        />
      )}

      {/* For siblings */}
      {hasSiblings && (
        <Handle
          type="source"
          position={isTreeHorizontal ? Top : Left}
          id={isTreeHorizontal ? Top : Left}
        />
      )}

      {/* Target Handle */}
      {!isRootNode && (
        <Handle
          type={'target'}
          position={getTargetPosition()}
          id={getTargetPosition()}
        />
      )}
      <div style={nodeStyle}>{label}</div>
    </div>
  );
});
