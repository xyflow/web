import { useCallback } from 'react';
import { Remark } from 'react-remark';
import { type Node, type NodeProps, useReactFlow } from '@xyflow/react';

export type SlideNode = Node<SlideData, 'slide'>;

export type SlideData = {
  source: string;
  left?: string;
  up?: string;
  down?: string;
  right?: string;
};

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;
export const SLIDE_PADDING = 100;

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideNode>) {
  const { source, left, up, down, right } = data;
  const { fitView } = useReactFlow();

  const moveToNextSlide = useCallback(
    (event: React.MouseEvent, id: string) => {
      event.stopPropagation();
      fitView({ nodes: [{ id }], duration: 150 });
    },
    [fitView],
  );

  return (
    <article className="slide" style={style}>
      <Remark>{source}</Remark>
      <footer className="slide__controls nopan">
        {left && <button onClick={(e) => moveToNextSlide(e, left)}>←</button>}
        {up && <button onClick={(e) => moveToNextSlide(e, up)}>↑</button>}
        {down && <button onClick={(e) => moveToNextSlide(e, down)}>↓</button>}
        {right && <button onClick={(e) => moveToNextSlide(e, right)}>→</button>}
      </footer>
    </article>
  );
}
