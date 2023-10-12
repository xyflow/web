import { type CSSProperties } from 'react';
import { Handle, HandleType, Position } from 'reactflow';
import { cn } from '../../../.';

type HandleComponentProps = {
  id?: string;
  style?: CSSProperties;
  label?: string;
  type: HandleType;
  position: Position;
};

export default function HandleComponent({
  style,
  label,
  position,
  ...props
}: HandleComponentProps) {
  const className = cn('w-[10px] h-[10px] bg-gray-400 border-none', {
    '-left-[5px]': position === Position.Left,
    '-right-[5px]': position === Position.Right,
  });

  return <Handle className={className} position={position} {...props} />;
}
