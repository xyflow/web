import { type PropsTableProps } from '@/components/props-table';

export const controlsProps: PropsTableProps = {
  props: [
    ['showZoom?', 'boolean', 'true'],
    ['showFitView?', 'boolean', 'true'],
    ['showInteractive?', 'boolean', 'true'],
    ['fitViewOptions?', 'FitViewOptions'],
    ['onZoomIn?', '() => void'],
    ['onZoomOut?', '() => void'],
    ['onFitView?', '() => void'],
    ['onInteractiveChange?', '(interactiveStatus: boolean) => void'],
    ['position?', 'PanelPosition', '"bottom-left"'],
  ],
};
