import { type PropsTableProps } from '@/components/props-table';

export const fitViewOptionsFields: PropsTableProps = {
  props: [
    ['padding?', 'number'],
    ['includeHiddenNodes?', 'boolean'],
    ['minZoom?', 'number'],
    ['maxZoom?', 'number'],
    ['duration?', 'number'],
    ['nodes?', "(Partial<Node> & { id: Node['id'] })[]"],
  ],
};
