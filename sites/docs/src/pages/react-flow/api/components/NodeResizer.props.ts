import { type PropsTableProps } from '@/components/props-table';

const links = {
  ResizeParams: '#resizeparams',
};

export const nodeResizerProps: PropsTableProps = {
  links,
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

export const resizeParamsFields: PropsTableProps = {
  links,
  props: [
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
  ],
};
