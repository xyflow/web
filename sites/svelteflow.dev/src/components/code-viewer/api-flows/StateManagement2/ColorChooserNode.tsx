import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import useStore, { NodeData } from './store';

function ColorChooserNode({ id, data }: NodeProps<NodeData>) {
  const updateNodeColor = useStore((state) => state.updateNodeColor);

  return (
    <div style={{ backgroundColor: data.color, borderRadius: 10 }}>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 20 }}>
        <input
          type="color"
          defaultValue={data.color}
          onChange={(evt) => updateNodeColor(id, evt.target.value)}
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ColorChooserNode;
