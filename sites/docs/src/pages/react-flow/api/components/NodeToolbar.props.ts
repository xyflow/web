import { type PropsTableProps } from '@/components/props-table';

export const nodeToolbarProps: PropsTableProps = {
  props: [
    ['nodeId?', 'string | string[]'],
    ['isVisible?', 'boolean'],
    ['position?', 'Position'],
    ['offset?', 'number'],
    ['align?', '"center" | "start" | "end"'],
  ],
};
