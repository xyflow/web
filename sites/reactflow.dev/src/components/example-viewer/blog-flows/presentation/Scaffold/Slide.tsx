import { type NodeProps } from 'reactflow';

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

export type SlideData = {};

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideData>) {
  return (
    <article className="slide" style={style}>
      <div>Hello, React Flow!</div>
    </article>
  );
}
