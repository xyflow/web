import { useEffect, useState } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';

const nodeStyle = {
  height: 150,
  width: 150,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  borderRadius: 10,
};

const labelStyle = {
  marginLeft: 10,
  mixBlendMode: 'difference',
  color: 'white',
  fontWeight: 'bold',
};

const handleStyle = {
  position: 'relative',
  top: 15,
};

function CustomHandle({ id, label, onChange }) {
  const connections = useHandleConnections({
    type: 'target',
    id,
  });

  const nodeData = useNodesData(
    connections.map((connection) => connection.source),
  );

  useEffect(() => {
    onChange(nodeData.length > 0 ? nodeData[0].value : 0);
  }, [nodeData]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        style={handleStyle}
      />
      <label htmlFor="red" style={labelStyle}>
        {label}
      </label>
    </div>
  );
}

function ColorPreview() {
  const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

  return (
    <div
      style={{
        ...nodeStyle,
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <CustomHandle
        id="red"
        label="R"
        onChange={(value) => setColor((c) => ({ ...c, r: value }))}
      />
      <CustomHandle
        id="green"
        label="G"
        onChange={(value) => setColor((c) => ({ ...c, g: value }))}
      />
      <CustomHandle
        id="blue"
        label="B"
        onChange={(value) => setColor((c) => ({ ...c, b: value }))}
      />
    </div>
  );
}

export default ColorPreview;
