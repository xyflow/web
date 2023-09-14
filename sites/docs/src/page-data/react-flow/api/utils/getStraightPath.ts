import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'sourceX', type: 'number' },
    { name: 'sourceY', type: 'number' },
    { name: 'targetX', type: 'number' },
    { name: 'targetY', type: 'number' },
    { name: 'Returns' },
    { name: '[0]', type: 'string', description: 'path?' },
    { name: '[1]', type: 'number', description: 'labelX?' },
    { name: '[2]', type: 'number', description: 'labelY?' },
    { name: '[3]', type: 'number', description: 'offsetX?' },
    { name: '[4]', type: 'number', description: 'offsetY?' },
  ],
};
