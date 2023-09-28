import ReactFlow, {
  MiniMap,
  Background,
  BackgroundVariant,
  Controls,
  Position,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomNode from './CustomNode';
import TooltipNode from './TooltipNode';
import MultiSelectionToolbar from './MultiSelectionToolbar';

const nodeTypes = {
  custom: CustomNode,
  tooltip: TooltipNode,
};

const defaultNodeStyle = {
  border: '2px solid #ff0071',
  background: 'white',
  borderRadius: 20,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: { label: 'toolbar top', toolbarPosition: Position.Top },
    position: { x: 200, y: 0 },
    style: defaultNodeStyle,
  },
  {
    id: '2',
    type: 'custom',
    data: { label: 'toolbar right', toolbarPosition: Position.Right },
    position: { x: -50, y: 100 },
    style: defaultNodeStyle,
  },
  {
    id: '3',
    type: 'custom',
    data: { label: 'toolbar bottom', toolbarPosition: Position.Bottom },
    position: { x: 0, y: 200 },
    style: defaultNodeStyle,
  },
  {
    id: '4',
    type: 'custom',
    data: { label: 'toolbar left', toolbarPosition: Position.Left },
    position: { x: 200, y: 300 },
    style: defaultNodeStyle,
  },
  {
    id: '5',
    type: 'tooltip',
    data: { label: 'hover tooltip', toolbarPosition: Position.Left },
    position: { x: 100, y: 400 },
    style: defaultNodeStyle,
  },
  {
    id: '6',
    type: 'custom',
    data: { label: 'toolbar always open', toolbarPosition: Position.Top, toolbarVisible: true },
    position: { x: 0, y: -100 },
    style: defaultNodeStyle,
  },
];

const initialEdges = [];

export default function NodeToolbarExample() {
  return (
    <ReactFlow
      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      className="react-flow-node-toolbar-example"
      minZoom={0.2}
      maxZoom={4}
      fitView
      fitViewOptions={{ padding: 0.5 }}
      nodeTypes={nodeTypes}
    >
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
      <Controls />
      <Panel>Select and move one of the nodes to see the toolbar</Panel>
      <MultiSelectionToolbar />
    </ReactFlow>
  );
}
