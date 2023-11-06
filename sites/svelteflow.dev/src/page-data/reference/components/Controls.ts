import { type PropsTableProps } from 'xy-shared';

export const controlsProps: PropsTableProps = {
  props: [
    { name: 'position?', type: 'PanelPosition', default: '"bottom-left"' },
    { name: 'showZoom?', type: 'boolean', default: 'true' },
    { name: 'showFitView?', type: 'boolean', default: 'true' },
    { name: 'showInteractive?', type: 'boolean', default: 'true' },
    { name: 'fitViewOptions?', type: 'FitViewOptions' },
    { name: 'buttonBgColor?', type: 'string', default: 'undefined' },
    { name: 'buttonBgColorHover?', type: 'string', default: 'undefined' },
    { name: 'buttonColor?', type: 'string', default: 'undefined' },
    { name: 'buttonColorHover?', type: 'string', default: 'undefined' },
  ],
};
