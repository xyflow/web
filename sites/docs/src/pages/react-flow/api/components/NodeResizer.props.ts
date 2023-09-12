import { type PropsTableProps } from '@/components/props-table';

export const nodeResizerProps: PropsTableProps = {
  props: [
    ['nodeId?', 'string'],
    ['color?', 'string'],
    ['handleClassName?', 'string'],
    ['handleStyle?', 'React.CSSProperties'],
    ['lineClassName?', 'string'],
    ['lineStyle?', 'React.CSSProperties'],
    ['isVisible?', 'boolean'],
    ['minWidth?', 'number'],
    ['minHeight?', 'number'],
    ['maxWidth?', 'number'],
    ['maxHeight?', 'number'],
    ['keepAspectRatio?', 'boolean'],
    ['shouldResize?', 'ShouldResize'],
    ['onResizeStart?', 'OnResizeStart'],
    ['onResize?', 'OnResize'],
    ['onResizeEnd?', 'OnResizeEnd'],
  ],
};
