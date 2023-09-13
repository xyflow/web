import { type PropsTableProps } from '@/components/props-table';

export const handleProps: PropsTableProps = {
  props: [
    { name: 'type', type: 'HandleType' },
    { name: 'position', type: 'Position' },
    { name: 'isConnectable', type: 'boolean' },
    { name: 'isConnectableStart', type: 'boolean' },
    { name: 'isConnectableEnd', type: 'boolean' },
    { name: 'onConnect', type: '(connection: Connection) => void' },
    { name: 'isValidConnection', type: '(connection: Connection) => boolean' },
    { name: 'id', type: 'string' },
  ],
};
