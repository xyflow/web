'use client';

import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { Subscribed } from '../pro/SubscriptionStatus';
import { openStripeCustomerPortal } from '../../server-actions/open-stripe-customer-portal';
import { signOut } from '../../server-actions/sign-out';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../ui/menubar';
import { buttonVariants } from '../ui/button';
import { cn } from '../../lib/utils';
import { redirect } from 'next/navigation';

export function NavMenuLoggedIn() {
  return (
    <Menubar className="border-0 bg-transparent p-0 shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            buttonVariants({ variant: 'pro', size: 'lg' }),
            // Ensure the gradient ring pseudo-elements render correctly in the menubar context.
            'px-1 w-10 isolate cursor-pointer',
          )}
        >
          <UserIcon height="18" />
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
              await signOut();
              // refetchUser();
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
