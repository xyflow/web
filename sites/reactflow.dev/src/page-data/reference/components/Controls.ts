import { type PropsTableProps } from 'xy-shared';

export const controlsProps: PropsTableProps = {
  props: [
    {
      name: 'showZoom?',
      type: 'boolean',
      default: 'true',
      description: `Whether or not to show the zoom in and zoom out buttons.
      These buttons will adjust the viewport zoom by a fixed amount each press.`,
    },
    {
      name: 'showFitView?',
      type: 'boolean',
      default: 'true',
      description: `Whether or not to show the fit view button. By default this
      button will adjust the viewport so that all nodes are visible at once.`,
    },
    { name: 'showInteractive?', type: 'boolean', default: 'true' },
    {
      name: 'fitViewOptions?',
      type: 'FitViewOptions',
      description: `Customise the options for the fit view button. These are the
      same options you would pass to the fitView function.`,
    },
    {
      name: 'onZoomIn?',
      type: '() => void',
      description: `Called in addition the default zoom behaviour when the zoom
      in button is clicked.`,
    },
    {
      name: 'onZoomOut?',
      type: '() => void',
      description: `Called in addition the default zoom behaviour when the zoom
      out button is clicked.`,
    },
    {
      name: 'onFitView?',
      type: '() => void',
      description: `Called when the fit view button is clicked. When this is not
      provided, the viewport will be adjusted so that all nodes are visible.`,
    },
    {
      name: 'onInteractiveChange?',
      type: '(interactiveStatus: boolean) => void',
      description: `Called when the interactive (lock) button is clicked.`,
    },
    { name: 'position?', type: 'PanelPosition', default: '"bottom-left"' },
    { name: 'ariaLabel?', type: 'string', default: '"React Flow controls"' },
    {
      name: 'orientation?',
      type: '"horizontal" | "vertical"',
      default: '"vertical"',
    },
  ],
};
