import { type NodeProps, useReactFlow } from 'reactflow';
import { Remark } from 'react-remark';
import { useCallback } from 'react';

export type SlideData = {
  source: string;
  left?: string;
  up?: string;
  down?: string;
  right?: string;
};

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

// The padding constant is used when computing the presentation layout. It adds
// a bit of space between each slide
export const SLIDE_PADDING = 100;

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideData>) {
  const { source, left, up, down, right } = data;
  const { fitView } = useReactFlow();

  const moveToNextSlide = useCallback(
    (event: React.MouseEvent, id: string) => {
      // Prevent the click event from propagating so `onNodeClick` is not
      // triggered when clicking on the control buttons.
      event.stopPropagation();
      fitView({ nodes: [{ id }], duration: 100 });
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
