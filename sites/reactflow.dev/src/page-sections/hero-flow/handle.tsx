import { type CSSProperties } from 'react';
import { Handle, HandleType, Position } from 'reactflow';

const defaultStyle = {
  width: 7,
  height: 14,
  backgroundColor: '#BDC4CC',
  border: 'none',
  borderRadius: 23,
};

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
  ...props
}: HandleComponentProps) {
  return <Handle style={{ ...defaultStyle, ...style }} {...props} />;
}
