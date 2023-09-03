import { type PropsTableProps } from '@/components/props-table';

export const connectionFields: PropsTableProps = {
  props: [
    ['source', 'string | null'],
    ['target', 'string | null'],
    ['sourceHandle', 'string | null'],
    ['targetHandle', 'string | null'],
  ],
};
