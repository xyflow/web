import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: 'Writable<Edge[]>',
      description: 'The current edge store.',
    },
  ],
};
