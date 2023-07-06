import SidebarItem from './SidebarItem';

const sidebarItems = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/examples',
    label: 'Pro Examples',
    matchSubPaths: true,
  },
  {
    href: '/account',
    label: 'Account',
  },
  {
    href: '/members',
    label: 'Members',
  },
  {
    href: '/billing',
    label: 'Billing',
  },
  {
    href: '/subscribe',
    label: 'Subscribe',
  },
];

const Sidebar = () => {
  return (
    <div className="lg:border-r pr-4 flex flex-wrap flex-row lg:flex-col lg:space-y-2 shrink-0">
      {sidebarItems.map((item) => (
        <SidebarItem {...item} key={item.href} />
      ))}
    </div>
  );
};

export default Sidebar;
