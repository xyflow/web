const sidebarClassNameLookup = {
  '/react-flow/examples/floating-edges': 'pro',
};

export default function SidebarTitle({ title, type, route }) {
  return (
    <div className={`sidebar-title ${sidebarClassNameLookup[route] ?? ''}`}>
      {title}
    </div>
  );
}
