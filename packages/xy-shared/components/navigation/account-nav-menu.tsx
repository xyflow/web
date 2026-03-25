import { redirect } from 'next/navigation';
import Link from 'next/link';

import { UserIcon } from '@heroicons/react/24/solid';

import { nhostOnClient } from '../../lib/nhost-on-client';
import { Subscribed } from '../pro/SubscriptionStatus';
import { openStripeCustomerPortal } from '../../server-actions/open-stripe-customer-portal';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../ui/menubar';

export function AccountNavMenu() {
  return (
    <Menubar className="border-0 bg-transparent p-0 shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <UserIcon className="animate-fade-in" height="18" />
        </MenubarTrigger>
        <MenubarContent align="end" className="border-border">
          <Link href="/pro/dashboard">
            <MenubarItem>Dashboard</MenubarItem>
          </Link>

          <Link href="/pro/account">
            <MenubarItem>Account</MenubarItem>
          </Link>

          <Subscribed requireAdminSubscription>
            <MenubarItem onClick={openStripeCustomerPortal}>Billing</MenubarItem>
          </Subscribed>
          <MenubarSeparator />
          <MenubarItem
            onClick={async () => {
              await nhostOnClient.auth.signOut({
                refreshToken: nhostOnClient.getUserSession()?.refreshToken,
              });
              nhostOnClient.clearSession();
              redirect('/');
            }}
          >
            Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
