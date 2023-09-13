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
    { name: '[0]', type: 'string' },
    { name: '[1]', type: 'number' },
    { name: '[2]', type: 'number' },
    { name: '[3]', type: 'number' },
    { name: '[4]', type: 'number' },
  ],
};

export const getBezierPathParams: PropsTableProps = {
  links: {
    GetBezierPathParams: '#getbezierpathparams',
  },
  props: [
    { name: 'params', type: 'GetBezierPathParams' },
    { name: 'GetBezierPathParams' },
    { name: 'sourceX', type: 'number' },
    { name: 'sourceY', type: 'number' },
    { name: 'sourcePosition?', type: 'Position', default: 'Position.Bottom' },
    { name: 'targetX', type: 'number' },
    { name: 'targetY', type: 'number' },
    { name: 'targetPosition?', type: 'Position', default: 'Position.Top' },
    { name: 'curvature?', type: 'number', default: '0.25' },
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
