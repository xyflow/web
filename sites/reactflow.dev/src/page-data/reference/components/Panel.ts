import type { PropsTableProps } from 'xy-shared';

export const panelProps: PropsTableProps = {
  props: [
    { name: 'position', type: 'PanelPosition' },
    { name: 'children', type: 'React.ReactNode' },
  ],
};
