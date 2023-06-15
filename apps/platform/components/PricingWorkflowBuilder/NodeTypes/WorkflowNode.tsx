import React, { memo, useCallback, useRef } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import cx from 'classnames';

import styles from './NodeTypes.module.css';
import useNodeClickHandler from '../hooks/useNodeClick';

interface BaseNodeProps extends NodeProps {
  className?: string;
  isDropzone?: boolean;
}

const WorkflowNode = ({ id, type, data, className }: BaseNodeProps) => {
  const clicked = useRef(false);
  const handleNodeClick = useNodeClickHandler(id);

  const onClick = useCallback(() => {
    clicked.current = true;
    handleNodeClick();
  }, [handleNodeClick]);

  return (
    <div onClick={onClick} className={cx(styles.node, className)} title="click to add a child node">
      {id === '1' && !clicked.current && (
        <div className={styles.swoopyWrapper}>
          <div className={styles.swoopy}>⤹</div>
          <div className={styles.swoopyText}>click on a node to add a child node.</div>
        </div>
      )}

      {data.label}
      {type !== 'data' && <Handle className={styles.handle} type="target" position={Position.Top} />}
      {type !== 'output' && (
        <Handle type="source" position={Position.Bottom} className={styles.handle} isConnectable={false}></Handle>
      )}
    </div>
  );
};

export default memo(WorkflowNode);
