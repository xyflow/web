import {
  Squares2X2Icon,
  RocketLaunchIcon,
  UsersIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import { NotSubscribed, Subscribed } from '@/components/SubscriptionStatus';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <div className="relative">
      <div className="lg:sticky lg:top-4 flex flex-wrap gap-2 lg:flex-col lg:pr-4">
        <SidebarItem icon={<Squares2X2Icon />} href="/" label="Overview" />
        <SidebarItem icon={<RocketLaunchIcon />} href="/examples" label="Pro Examples" matchSubPaths />
        <Subscribed>
          <SidebarItem icon={<UsersIcon />} href="/team" label="Team" />
        </Subscribed>
        <SidebarItem icon={<Cog8ToothIcon />} href="/account" label="Account" />
        <SidebarItem icon={<CreditCardIcon />} href="/billing" label="Billing" />
        <NotSubscribed>
          <SidebarItem
            icon={<SparklesIcon />}
            href="/subscribe"
            label="Subscribe"
            className="!text-react hover:!bg-pink-100"
          />
        </NotSubscribed>
      </div>
    </div>
  );
};

export default Sidebar;
