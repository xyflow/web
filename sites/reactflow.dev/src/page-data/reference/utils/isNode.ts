import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'item', type: 'any' },
    { name: 'Returns' },
    {
      name: '',
      type: 'boolean',
      description: `Tests if whatever you passed in can be used as an node. If
      you're using TypeScript, this function actions as a type guard and will
      narrow the type of whatever you pass in to an Node if it returns true.`,
    },
  ],
};
