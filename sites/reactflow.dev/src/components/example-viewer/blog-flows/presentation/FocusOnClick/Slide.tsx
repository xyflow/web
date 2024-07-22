import { type Node, type NodeProps } from '@xyflow/react';
import { Remark } from 'react-remark';

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

export type SlideNode = Node<SlideData, 'slide'>;

export type SlideData = {
  source: string;
  left?: string;
  up?: string;
  down?: string;
  right?: string;
};

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideNode>) {
  return (
    <article className="slide" style={style}>
      <Remark>{data.source}</Remark>
    </article>
  );
}
