const proExampleRoutes = {
  '/react-flow/examples/nodes/dynamic-grouping': 'pro',
  '/react-flow/examples/nodes/resize-rotate-moveable-deprecated': 'pro',
  '/react-flow/examples/nodes/shapes': 'pro',
  '/react-flow/examples/layout/force-layout': 'pro',
  '/react-flow/examples/layout/workflow-builder-starter': 'pro',
  '/react-flow/examples/interaction/collaborative': 'pro',
  '/react-flow/examples/interaction/helper-lines': 'pro',
  '/react-flow/examples/interaction/undo-and-redo': 'pro',
  '/react-flow/examples/interaction/copy-and-paste': 'pro',
};

export default function SidebarTitle({
  title,
  type,
  route,
}: {
  title: string;
  type: string;
  route: string;
}) {
  return (
    <div className={`sidebar-title ${proExampleRoutes[route] ?? ''}`}>
      {title}
    </div>
  );
}
