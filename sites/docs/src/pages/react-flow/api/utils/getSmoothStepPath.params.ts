import { type PropsTableProps } from '@/components/props-table';

export const getSmoothStepPathParams: PropsTableProps = {
  props: [
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
  ],
};

export const returnType: PropsTableProps = {
  props: [
    { name: '[0]', type: 'string' },
    { name: '[1]', type: 'number' },
    { name: '[2]', type: 'number' },
    { name: '[3]', type: 'number' },
    { name: '[4]', type: 'number' },
  ],
};
