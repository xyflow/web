import { PropsTableProps } from '@/components/props-table';

export const panelProps: PropsTableProps = {
  props: [
    { name: 'position', type: 'PanelPosition' },
    { name: 'children', type: 'React.ReactNode' },
  ],
};
