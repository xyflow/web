import { type PropsTableProps } from 'xy-shared';

export const nodeResizerProps: PropsTableProps = {
  props: [
    { name: 'nodeId?', type: 'string' },
    { name: 'color?', type: 'string' },
    { name: 'handleClass?', type: 'string' },
    { name: 'handleStyle?', type: 'string' },
    { name: 'lineClass?', type: 'string' },
    { name: 'lineStyle?', type: 'string' },
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
