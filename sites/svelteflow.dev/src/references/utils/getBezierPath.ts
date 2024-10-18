import { type PropsTableProps } from 'xy-shared';

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
