import { Node, NodeProps, Position, useNodesData } from '@xyflow/react';

import Fiber from './fiber';
import Handle from './handle';
import Wrapper from './node-wrapper';

export type HeroNode = Node<{ label: string }>;

export default function HeroNode({ data }: NodeProps<HeroNode>) {
  const { label = '' } = data;
  const color = useNodesData('color');
  const shape = useNodesData('shape');
  const zoom = useNodesData('zoom');

  return (
    <Wrapper label={label}>
      <div className="w-full h-[200px]">
        <Fiber
          color={color?.data.value}
          shape={shape?.data.value}
          zoom={zoom?.data.value}
        />
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
