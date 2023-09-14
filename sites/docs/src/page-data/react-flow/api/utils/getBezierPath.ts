import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'params', type: 'object' },
    { name: 'params.sourceX', type: 'number' },
    { name: 'params.sourceY', type: 'number' },
    {
      name: 'params.sourcePosition?',
      type: 'Position',
      default: 'Position.Bottom',
    },
    { name: 'params.targetX', type: 'number' },
    { name: 'params.targetY', type: 'number' },
    {
      name: 'params.targetPosition?',
      type: 'Position',
      default: 'Position.Top',
    },
    { name: 'params.curvature?', type: 'number', default: '0.25' },
    { name: 'Returns' },
    { name: '[0]', type: 'string', description: 'path?' },
    { name: '[1]', type: 'number', description: 'labelX?' },
    { name: '[2]', type: 'number', description: 'labelY?' },
    { name: '[3]', type: 'number', description: 'offsetX?' },
    { name: '[4]', type: 'number', description: 'offsetY?' },
  ],
};
