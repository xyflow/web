import { type PropsTableProps } from '@/components/props-table';

export const getStraightPathParams: PropsTableProps = {
  props: [
    { name: 'sourceX', type: 'number' },
    { name: 'sourceY', type: 'number' },
    { name: 'targetX', type: 'number' },
    { name: 'targetY', type: 'number' },
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
