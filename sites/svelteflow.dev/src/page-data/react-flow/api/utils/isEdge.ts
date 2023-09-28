import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'item', type: 'any' },
    { name: 'Returns' },
    {
      name: '',
      type: 'boolean',
      description: `Tests if whatever you passed in can be used as an edge. If
      you're using TypeScript, this function actions as a type guard and will
      narrow the type of whatever you pass in to an Edge if it returns true.`,
    },
  ],
};
