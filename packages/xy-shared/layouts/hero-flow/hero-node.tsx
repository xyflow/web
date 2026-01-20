import { Node, NodeProps, Position, useNodesData } from '@xyflow/react';

import Fiber from './fiber';
import Handle from './handle';
import Wrapper from './node-wrapper';
import { ColorPickerNode } from './color-picker-node';
import { SwitcherNode } from './switcher-node';
import { SliderNode } from './slider-node';

export type HeroNode = Node<{ label: string }>;

export default function HeroNode({ data }: NodeProps<HeroNode>) {
  const { label = '' } = data;
  const color = useNodesData<ColorPickerNode>('color');
  const shape = useNodesData<SwitcherNode>('shape');
  const zoom = useNodesData<SliderNode>('zoom');

  return (
    <Wrapper label={label}>
      <div className="w-full h-[200px]">
        <Fiber
          color={color?.data.value}
          shape={shape?.data.value}
          zoom={zoom?.data.value}
        />
        <Handle type="target" position={Position.Left} style={{ top: 20 }} id="color" />
        <Handle type="target" position={Position.Left} style={{ top: 40 }} id="shape" />
        <Handle type="target" position={Position.Left} style={{ top: 60 }} id="zoom" />
      </div>
    </Wrapper>
  );
}
