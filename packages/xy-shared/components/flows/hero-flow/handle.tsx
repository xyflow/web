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
      className="h-[10px] w-[10px] border-none bg-gray-400"
      position={position}
      style={style}
      {...props}
    />
  );
}
