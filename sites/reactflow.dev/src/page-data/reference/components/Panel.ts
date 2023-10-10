import { PropsTableProps } from 'xy-ui';

export const panelProps: PropsTableProps = {
  props: [
    { name: 'position', type: 'PanelPosition' },
    { name: 'children', type: 'React.ReactNode' },
  ],
};
