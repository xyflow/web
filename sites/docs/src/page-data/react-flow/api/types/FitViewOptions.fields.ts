import { type PropsTableProps } from '@/components/props-table';

export const fitViewOptionsFields: PropsTableProps = {
  props: [
    { name: 'padding?', type: 'number' },
    { name: 'includeHiddenNodes?', type: 'boolean' },
    { name: 'minZoom?', type: 'number' },
    { name: 'maxZoom?', type: 'number' },
    { name: 'duration?', type: 'number' },
    { name: 'nodes?', type: "(Partial<Node> & { id: Node['id'] })[]" },
  ],
};
