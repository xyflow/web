'use client';

import { FC } from 'react';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/solid';
import { PlanLabel, Subscribed } from '@/components/pro/SubscriptionStatus';
import { openStripeCustomerPortal, signOut } from '@/server-actions';
import { NavMenuNotLoggedIn } from './NavMenuNotLoggedIn';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from 'xy-shared';
import { useAuthContext } from '@/components/auth-context';
import { Spinner } from '@xyflow/xy-ui';
import { redirect } from 'next/navigation';

const NavMenu: FC = () => {
  const { isLoading, user, refetchUser } = useAuthContext();

  if (isLoading) {
    return <Spinner className="text-primary" />;
  }

  if (!user) {
    return <NavMenuNotLoggedIn />;
  }

  return (
    <Menubar className="bg-primary text-white rounded-full w-9 h-9 p-0">
      <MenubarMenu>
        <MenubarTrigger>
          <UserIcon height="18" />
        </MenubarTrigger>
        <MenubarContent align="end" className="border-gray-200">
          <div className="p-2 w-[200px] text-sm">
            You are signed in as <strong>{user.email}</strong> and subscribed to the{' '}
            <span className="text-primary font-bold">
              <PlanLabel />
            </span>{' '}
            plan.
          </div>

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
};

export default NavMenu;
