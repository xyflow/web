import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'bounds', type: 'Rect' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
    { name: 'minZoom', type: 'number' },
    { name: 'maxZoom', type: 'number' },
    { name: 'padding?', type: 'number', default: '0.1' },
    { name: 'Returns' },
    {
      name: '[0]',
      type: 'number',
      description: 'The x position of the transformed viewport.',
    },
    {
      name: '[1]',
      type: 'number',
      description: 'The y position of the transformed viewport',
    },
    {
      name: '[2]',
      type: 'number',
      description: 'The zoom level of the transformed viewport.',
    },
  ],
};
