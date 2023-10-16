import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'options', type: 'object' },
    {
      name: 'options.onStart',
      type: '(viewport: Viewport) => void',
    },
    {
      name: 'options.onChange',
      type: '(viewport: Viewport) => void',
    },
    {
      name: 'options.onEnd',
      type: '(viewport: Viewport) => void',
    },
    { name: 'Returns' },
    { name: '', type: 'void' },
  ],
};
