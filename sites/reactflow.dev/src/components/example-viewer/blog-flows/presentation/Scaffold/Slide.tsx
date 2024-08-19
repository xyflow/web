import { type Node, type NodeProps } from '@xyflow/react';

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

export type SlideNode = Node<SlideData, 'slide'>;

export type SlideData = {};

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideNode>) {
  return (
    <article className="slide" style={style}>
      <div>Hello, React Flow!</div>
    </article>
  );
}
