import { type PropsTableProps } from 'xy-shared';

export const nodeResizerProps: PropsTableProps = {
  props: [
    { name: 'nodeId?', type: 'string' },
    { name: 'color?', type: 'string' },
    { name: 'handleClassName?', type: 'string' },
    { name: 'handleStyle?', type: 'React.CSSProperties' },
    { name: 'lineClassName?', type: 'string' },
    { name: 'lineStyle?', type: 'React.CSSProperties' },
    { name: 'isVisible?', type: 'boolean' },
    { name: 'minWidth?', type: 'number' },
    { name: 'minHeight?', type: 'number' },
    { name: 'maxWidth?', type: 'number' },
    { name: 'maxHeight?', type: 'number' },
    { name: 'keepAspectRatio?', type: 'boolean' },
    {
      name: 'shouldResize?',
      type: '(event: D3.DragEvent, params: ResizeParams & { direction: number[]; }) => boolean',
    },
    {
      name: 'onResizeStart?',
      type: '(event: D3.DragEvent, params: ResizeParams) => void',
    },
    {
      name: 'onResize?',
      type: '(event: D3.DragEvent, params: ResizeParams & { direction: number[]; }) => void',
    },
    {
      name: 'onResizeEnd?',
      type: '(event: D3.DragEvent, params: ResizeParams) => void',
    },
  ],
};
