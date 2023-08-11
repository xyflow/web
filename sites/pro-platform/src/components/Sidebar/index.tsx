import { NotSubscribed, Subscribed } from '../SubscriptionStatus';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <div className=" pr-4 flex flex-wrap flex-row lg:flex-col lg:space-y-2 shrink-0 lg:sticky lg:top-4 lg:self-start">
      <SidebarItem href="/" label="Overview" />
      <SidebarItem href="/examples" label="Pro Examples" matchSubPaths />
      <Subscribed>
        <SidebarItem href="/team" label="Team" />
      </Subscribed>
      <SidebarItem href="/account" label="Account" />
      <SidebarItem href="/billing" label="Billing" />
      <NotSubscribed>
        <SidebarItem href="/subscribe" label="Subscribe" />
      </NotSubscribed>
    </div>
  );
};

export default Sidebar;
