import { type PropsTableProps } from '@/components/props-table';
import * as Types from '../types/_meta.json';

const links = Object.fromEntries(
  Object.keys(Types).map((t) => [t.split('.')[0], `/react-flow/api/types/${t}`])
);

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
  links: links,
};
