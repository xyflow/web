import { type PropsTableProps } from '@/components/props-table';

export const controlsProps: PropsTableProps = {
  props: [
    { name: 'showZoom?', type: 'boolean', default: 'true' },
    { name: 'showFitView?', type: 'boolean', default: 'true' },
    { name: 'showInteractive?', type: 'boolean', default: 'true' },
    { name: 'fitViewOptions?', type: 'FitViewOptions' },
    { name: 'onZoomIn?', type: '() => void' },
    { name: 'onZoomOut?', type: '() => void' },
    { name: 'onFitView?', type: '() => void' },
    {
      name: 'onInteractiveChange?',
      type: '(interactiveStatus: boolean) => void',
      description: `Called when the interactive (lock) button is clicked.`,
    },
    { name: 'position?', type: 'PanelPosition', default: '"bottom-left"' },
  ],
};
