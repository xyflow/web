'use client';

import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { PlanLabel, Subscribed } from '../SubscriptionStatus';
import { openStripeCustomerPortal } from '../../../server-actions/open-stripe-customer-portal';
import { signOut } from '../../../server-actions/sign-out';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../../menubar';
import { buttonVariants } from '../../ui/button';
import { cn } from '../../../lib/utils';
import { redirect } from 'next/navigation';
import { User } from '@nhost/nhost-js/auth';

export function NavMenuLoggedIn({
  isLoading,
  user,
  refetchUser,
}: {
  isLoading: boolean;
  user?: User | null;
  refetchUser: () => void;
}) {
  return (
    <Menubar className="border-0 bg-transparent p-0 shadow-none">
      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            buttonVariants({ variant: 'pro', size: 'lg' }),
            // Ensure the gradient ring pseudo-elements render correctly in the menubar context.
            'px-1 w-10 isolate',
          )}
        >
          <UserIcon height="18" />
        </MenubarTrigger>
        <MenubarContent align="end" className="border-gray-200">
          {!isLoading && (
            <div className="p-2 w-[200px] text-sm">
              You are signed in as <strong>{user?.email}</strong> and subscribed to the{' '}
              <span className="text-primary font-bold">
                <PlanLabel />
              </span>{' '}
              plan.
            </div>
          )}

          <Link href="/pro/dashboard">
            <MenubarItem>Dashboard</MenubarItem>
          </Link>

          <Link href="/pro/account">
            <MenubarItem>Account</MenubarItem>
          </Link>

          <Subscribed requireAdminSubscription>
            <MenubarItem
              onClick={openStripeCustomerPortal}
              className="hover:bg-slate-100 cursor-pointer px-2 py-1"
            >
              Billing
            </MenubarItem>
          </Subscribed>
          <MenubarSeparator />
          <MenubarItem
            onClick={async () => {
              await signOut();
              refetchUser();
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
