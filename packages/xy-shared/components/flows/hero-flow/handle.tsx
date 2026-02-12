import { type CSSProperties } from 'react';
import { Handle, HandleType, Position } from '@xyflow/react';

type HandleComponentProps = {
  id?: string;
  style?: CSSProperties;
  type: HandleType;
  position: Position;
};

export default function HandleComponent({
  style,
  position,
  ...props
}: HandleComponentProps) {
  return (
    <Handle
      className="w-[10px] h-[10px] bg-gray-400 border-none"
      position={position}
      style={style}
      {...props}
    />
  );
}
