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

function ColorPreview() {
  // const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

  const redConnections = useHandleConnections({
    type: 'target',
    id: 'red',
  });
  const redNodeData = useNodesData(
    redConnections.map((connection) => connection.source),
  );

  const greenConnections = useHandleConnections({
    type: 'target',
    id: 'green',
  });
  const greenNodeData = useNodesData(
    greenConnections.map((connection) => connection.source),
  );

  const blueConnections = useHandleConnections({
    type: 'target',
    id: 'blue',
  });
  const blueNodeData = useNodesData(
    blueConnections.map((connection) => connection.source),
  );

  const color = {
    r: redNodeData.length > 0 ? redNodeData[0].value : 0,
    g: greenNodeData.length > 0 ? greenNodeData[0].value : 0,
    b: blueNodeData.length > 0 ? blueNodeData[0].value : 0,
  };

  return (
    <div
      style={{
        ...nodeStyle,
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="red"
          style={handleStyle}
        />
        <label htmlFor="red" style={labelStyle}>
          R
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="green"
          style={handleStyle}
        />
        <label htmlFor="green" style={labelStyle}>
          G
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="blue"
          style={handleStyle}
        />
        <label htmlFor="red" style={labelStyle}>
          B
        </label>
      </div>
    </div>
  );
}

export default ColorPreview;
