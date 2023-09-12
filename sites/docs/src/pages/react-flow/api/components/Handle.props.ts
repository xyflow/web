import { type PropsTableProps } from '@/components/props-table';

export const handleProps: PropsTableProps = {
  props: [
    ['type', 'HandleType'],
    ['position', 'Position'],
    ['isConnectable', 'boolean'],
    ['isConnectableStart', 'boolean'],
    ['isConnectableEnd', 'boolean'],
    ['onConnect', '(connection: Connection) => void'],
    ['isValidConnection', '(connection: Connection) => boolean'],
    ['id', 'string'],
  ],
};
