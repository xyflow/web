import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

function TextUpdaterNode({ id }) {
  const [number, setNumber] = useState(0);

  const onChange = useCallback((evt) => {
    const cappedNumber = Math.round(
      Math.min(255, Math.max(0, evt.target.value)),
    );
    setNumber(cappedNumber);
  }, []);

  return (
    <>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default TextUpdaterNode;
