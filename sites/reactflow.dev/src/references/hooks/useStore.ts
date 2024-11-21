import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    {
      name: 'selector',
      type: '(state: ReactFlowState) => T',
      description: `A selector function that returns a slice of the flow's internal
      state. Extracting or transforming just the state you need is a good practice
      to avoid unnecessary re-renders.`,
    },
    {
      name: 'equalityFn?',
      type: '(prev: T, next: T) => boolean',
      description: `A function to compare the previous and next value. This is
      incredibly useful for preventing unnecessary re-renders. Good sensible
      defaults are using Object.is or importing zustand/shallow, but you can
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
