import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'selector', type: '(state: ReactFlowState) => T' },
    {
      name: 'equalityFn?',
      type: '(prev: T, next: T) => boolean',
      description: `A function to compare the previous and next value. This is
      incredibly useful for preventing uneccessary re-renders. Good sensible
      defaults are using Object.is or importing zustand/shaddlow, but you can
      be as granular as you like.`,
    },
    { name: 'Returns' },
    {
      name: '',
      type: 'T',
      description: '',
    },
  ],
};
