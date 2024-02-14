import { useState, useEffect } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';

const nodeStyle = {
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderRadius: 10,
};

function LightnessNode() {
  const connections = useHandleConnections({ type: 'target' });
  const nodesData = useNodesData(
    connections.map((connection) => connection.source),
  );

  const [lightness, setLightness] = useState('dark');

  useEffect(() => {
    if (nodesData.length > 0 && nodesData[0].value) {
      const color = nodesData[0].value;
      setLightness(
        0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128
          ? 'light'
          : 'dark',
      );
    } else {
      setLightness('dark');
    }
  }, [nodesData]);

  return (
    <div
      style={{
        ...nodeStyle,
        background: lightness === 'light' ? 'white' : 'black',
        color: lightness === 'light' ? 'black' : 'white',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div>
        This color is
        <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{lightness}</p>
      </div>
    </div>
  );
}

export default LightnessNode;
