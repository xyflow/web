import { type PropsTableProps } from 'xy-shared';

export const connectionLineComponentPropsFields: PropsTableProps = {
  props: [
    { name: 'connectionLineStyle?', type: 'React.CSSProperties' },
    { name: 'connectionLineType', type: 'ConnectionLineType' },
    {
      name: 'fromNode?',
      type: 'Node',
      description: `The node the connection line originates from.`,
    },
    {
      name: 'fromHandle?',
      type: 'HandleElement',
      description: `The handle on the fromNode that the connection line originates
      from.`,
    },
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
