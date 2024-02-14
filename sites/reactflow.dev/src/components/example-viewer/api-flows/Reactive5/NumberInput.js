import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function NumberInput({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data.value);

  const onChange = useCallback((evt) => {
    const cappedNumber = Math.min(255, Math.max(0, evt.target.value));
    setNumber(cappedNumber);
    updateNodeData(id, { value: cappedNumber });
  }, []);

  return (
    <div
      style={{
        padding: 10,
        background: '#FFF',
        border: '1px solid #CCC',
        borderRadius: 10,
      }}
    >
      <div>{data.label}</div>
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
    </div>
  );
}

export default NumberInput;
