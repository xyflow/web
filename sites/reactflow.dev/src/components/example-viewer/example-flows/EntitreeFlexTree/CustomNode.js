import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { nodeHeight, nodeWidth } from './App';

const { Top, Bottom, Left, Right } = Position;

export default memo(({ data: nodeInfo, id: nodeId }) => {
  const { isSpouse, isSibling, label, direction } = nodeInfo;

  const isTreeHorizontal = direction === 'LR';

  // Define the node style
  const nodeStyle = {
    height: nodeHeight,
    minWidth: nodeWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    borderRadius: '4px',
  };

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
