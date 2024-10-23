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
      name: 'viewport',
      type: 'Viewport',
      description:
        'The transformed viewport (`{ x: number, y: number, zoom: number }`).',
    },
  ],
};
