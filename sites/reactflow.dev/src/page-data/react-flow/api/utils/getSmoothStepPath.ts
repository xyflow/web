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
    {
      name: '[0]',
      type: 'string',
      description: 'The path to use in an SVG <path> element.',
    },
    {
      name: '[1]',
      type: 'number',
      description:
        'The x position you can use to render a label for this edge.',
    },
    {
      name: '[2]',
      type: 'number',
      description:
        'The y position you can use to render a label for this edge.',
    },
    {
      name: '[3]',
      type: 'number',
      description: `The absolute difference between the source x position and
      the x position of the middle of this path.`,
    },
    {
      name: '[4]',
      type: 'number',
      description: `The absolute difference between the source y position and
      the y position of the middle of this path.`,
    },
  ],
};
