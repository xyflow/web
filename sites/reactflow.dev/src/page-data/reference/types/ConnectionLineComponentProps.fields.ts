import { type PropsTableProps } from 'xy-shared';

export const connectionLineComponentPropsFields: PropsTableProps = {
  props: [
    { name: 'connectionLineStyle?', type: 'React.CSSProperties' },
    { name: 'connectionLineType', type: 'ConnectionLineType' },
    { name: 'fromNode?', type: 'Node' },
    { name: 'fromHandle?', type: 'HandleElement' },
    { name: 'fromX', type: 'number' },
    { name: 'fromY', type: 'number' },
    { name: 'toX', type: 'number' },
    { name: 'toY', type: 'number' },
    { name: 'fromPosition', type: 'Position' },
    { name: 'toPosition', type: 'Position' },
    {
      name: 'connectionStatus',
      type: '"valid" | "invalid" | null',
      description: `If there is an isValidConnection callback, this prop will be
      set to "valid" or "invalid" based on the return value of that callback.
      Otherwise, it will be null.`,
    },
  ],
};
