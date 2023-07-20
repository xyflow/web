import { NotSubscribed, Subscribed } from '../SubscriptionStatus';
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
];

const Sidebar = () => {
  return (
    <div className=" pr-4 flex flex-wrap flex-row lg:flex-col lg:space-y-2 shrink-0 lg:sticky lg:top-4 lg:self-start">
      {sidebarItems.map((item) => (
        <SidebarItem {...item} key={item.href} />
      ))}
      <NotSubscribed>
        <SidebarItem href="/subscribe" label="Subscribe" />
      </NotSubscribed>
    </div>
  );
};

export default Sidebar;
