import { useState, useEffect } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';

function LightnessNode({ id }) {
  const { updateNodeData } = useReactFlow();
  const connections = useHandleConnections({ type: 'target' });
  const nodesData = useNodesData(connections?.[0].source);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (nodesData?.data.value) {
      const color = nodesData.data.value;
      const isLight =
        0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128;
      setIsDark(!isLight);

      const newNodeData = isLight
        ? { light: color, dark: null }
        : { light: null, dark: color };
      updateNodeData(id, newNodeData);
    } else {
      setIsDark(true);
      updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
    }
  }, [nodesData, updateNodeData]);

  return (
    <div
      className="lightness-node"
      style={{
        background: isDark ? 'black' : 'white',
        color: isDark ? 'white' : 'black',
      }}
    >
      <Handle type="target" position={Position.Left} />

      <Handle
        type="source"
        id="light"
        position={Position.Right}
        style={{ top: 10, transform: 'translate(50%,0)' }}
      >
        <div
          style={{
            fontWeight: isDark ? 'normal' : 'bold',
            opacity: isDark ? 0.5 : 1,
          }}
        >
          Light
        </div>
      </Handle>
      <Handle
        type="source"
        id="dark"
        position={Position.Right}
        style={{ top: 'auto', bottom: 10, transform: 'translate(50%,0)' }}
      >
        <div
          style={{
            fontWeight: isDark ? 'bold' : 'normal',
            opacity: isDark ? 1 : 0.5,
          }}
        >
          Dark
        </div>
      </Handle>
    </div>
  );
}

export default LightnessNode;
