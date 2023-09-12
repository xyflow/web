import { type PropsTableProps } from '@/components/props-table';

export const handleElementFields: PropsTableProps = {
  props: [
    ['id', 'string | null'],
    ['x', 'number'],
    ['y', 'number'],
    ['width', 'number'],
    ['height', 'number'],
    ['position', 'Position'],
  ],
};
