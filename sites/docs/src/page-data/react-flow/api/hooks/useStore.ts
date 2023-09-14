import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'selector', type: '(state: ReactFlowState) => T' },
    { name: 'equalityFn?', type: '(prev: T, next: T) => boolean' },
    { name: 'Returns' },
    {
      name: '',
      type: 'T',
      description: '',
    },
  ],
};
