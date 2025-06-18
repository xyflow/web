'use client';

import { ComponentProps, FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { User } from '@nhost/nhost-js';
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '@xyflow/xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { PlanLabel, Subscribed } from '@/components/pro/SubscriptionStatus';
import { openStripeCustomerPortal, signOut } from '@/server-actions';

const NavMenu: FC<{ user: User | null }> = ({ user }) => {
  const pathname = usePathname();

  if (!user) {
    return (
      <>
        <Button asChild className="px-4 flex gap-1">
          <Link href="/pro">
            <SparklesIcon height="16" />
            <span className="max-[1100px]:hidden">React Flow</span>
            Pro
          </Link>
        </Button>
        {(() => {
          const buttonProps: ComponentProps<typeof Button> = {
            asChild: true,
            variant: 'secondary',
            // Set fixed width to avoid navbar shifts on Sign In / Sign Out button click
            className: 'w-[100px]',
          };

          switch (pathname) {
            case '/pro':
            case '/pro/sign-in':
              return (
                <Button {...buttonProps}>
                  <Link href="/pro/sign-up">Sign Up</Link>
                </Button>
              );
            case '/pro/sign-up':
              return (
                <Button {...buttonProps}>
                  <Link href="/pro/sign-in">Sign In</Link>
                </Button>
              );
          }
        })()}
      </>
    );
  }

  return (
    <Select>
      <SelectTrigger className="w-auto" variant="primary">
        <UserIcon height="24" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel className="text-sm font-normal max-w-[200px] px-2 py-1">
            You are signed in as <strong>{user.email}</strong> and subscribed to the{' '}
            <span className="text-primary font-bold">
              <PlanLabel />
            </span>{' '}
            plan.
          </SelectLabel>
          <SelectSeparator />
          <Link href="/pro/dashboard">
            <SelectLabel className="hover:bg-slate-100 px-2 py-1">Dashboard</SelectLabel>
          </Link>
          <SelectSeparator />
          <Link href="/pro/account">
            <SelectLabel className="hover:bg-slate-100 px-2 py-1">Account</SelectLabel>
          </Link>
          <SelectSeparator />
          <Subscribed requireAdminSubscription>
            <SelectLabel
              onClick={openStripeCustomerPortal}
              className="hover:bg-slate-100 cursor-pointer px-2 py-1"
            >
              Billing
            </SelectLabel>

            <SelectSeparator />
          </Subscribed>
          <SelectLabel
            onClick={signOut}
            className="text-red-500 hover:bg-slate-100 cursor-pointer px-2 py-1"
          >
            Logout
          </SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default NavMenu;
