import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'sourceX', type: 'number' },
    { name: 'sourceY', type: 'number' },
    { name: 'sourcePosition', type: 'Position', default: 'Position.Bottom' },
    { name: 'targetX', type: 'number' },
    { name: 'targetY', type: 'number' },
    { name: 'targetPosition?', type: 'Position', default: 'Position.Top' },
    { name: 'borderRadius?', type: 'number', default: '5' },
    { name: 'centerX?', type: 'number' },
    { name: 'centerY?', type: 'number' },
    { name: 'offset?', type: 'number', default: '20' },
    { name: 'Returns' },
    { name: '[0]', type: 'string', description: 'path?' },
    { name: '[1]', type: 'number', description: 'labelX?' },
    { name: '[2]', type: 'number', description: 'labelY?' },
    { name: '[3]', type: 'number', description: 'offsetX?' },
    { name: '[4]', type: 'number', description: 'offsetY?' },
  ],
};
