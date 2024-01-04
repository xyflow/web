import { NodeProps, Position, useNodesData } from '@xyflow/react';

import Fiber from './fiber';
import Handle from './handle';
import Wrapper from './node-wrapper';

export default function HeroNode({ data }: NodeProps) {
  const { label = '' } = data;
  const color = useNodesData('color');
  const shape = useNodesData('shape');
  const zoom = useNodesData('zoom');

  return (
    <Wrapper label={label}>
      <div className="w-full h-[200px]">
        <Fiber color={color.value} shape={shape.value} zoom={zoom.value} />
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: 20 }}
          id="color"
        />
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: 40 }}
          id="shape"
        />
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: 60 }}
          id="zoom"
        />
      </div>
    </Wrapper>
  );
}
