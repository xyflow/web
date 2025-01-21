import { type PropsTableProps } from 'xy-shared';

export const nodeResizeControlProps: PropsTableProps = {
  props: [
    { name: 'nodeId', type: 'string' },
    {
      name: 'position?',
      type: '"top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"',
      default: '"bottom-right"',
    },
    { name: 'variant?', type: '"handle" | "line"', default: '"handle"' },
    { name: 'keepAspectRatio?', type: 'boolean', default: 'false' },
    { name: 'minWidth?', type: 'number', default: '10' },
    { name: 'maxWidth?', type: 'number', default: 'Number.MAX_SAFE_INTEGER' },
    { name: 'minHeight?', type: 'number', default: '10' },
    { name: 'maxHeight?', type: 'number', default: 'Number.MAX_SAFE_INTEGER' },
    { name: 'color?', type: 'string' },
    { name: 'style?', type: 'string' },
    { name: 'class?', type: 'string' },
    { name: 'children?', type: 'React.ReactNode' },
    {
      name: 'shouldResize?',
      type: '(event: D3.DragEvent, params: ResizeParams & { direction: number[] }) => boolean',
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
