import { type PropsTableProps } from 'xy-ui';

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
    { name: 'connectionStatus', type: '"valid" | "invalid" | null' },
  ],
};
