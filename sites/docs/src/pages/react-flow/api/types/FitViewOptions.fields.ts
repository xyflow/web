import { type PropsTableProps } from '@/components/props-table';
import * as Types from '../types/_meta.json';

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
