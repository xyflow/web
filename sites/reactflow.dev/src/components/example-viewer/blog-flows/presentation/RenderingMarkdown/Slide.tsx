import { type NodeProps } from 'reactflow';
import { Remark } from 'react-remark';

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

export type SlideData = {
  source: string;
};

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideData>) {
  return (
    <article className="slide" style={style}>
      <Remark>{data.source}</Remark>
    </article>
  );
}
