'use client';

import Link from 'next/link';
import { useSignOut, useUserEmail } from '@nhost/react';
import {
  Select,
  SelectContent,
  SelectSeparator,
  SelectLabel,
  SelectTrigger,
  SelectGroup,
} from '@xyflow/xy-ui';
import { UserIcon } from '@heroicons/react/24/solid';
import useStripeCustomerPortal from '@/hooks/useStripeCustomerPortal';
import { PlanLabel, Subscribed } from '@/components/pro/SubscriptionStatus';
import { FC } from 'react';

export const UserMenu: FC = () => {
  const userEmail = useUserEmail();
  const { openCustomerPortal } = useStripeCustomerPortal();
  const { signOut } = useSignOut();
  return (
    <Select>
      <SelectTrigger className="w-auto">
        <UserIcon className="w-6 h-6 fill-gray-500" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel className="text-sm font-normal max-w-[200px] px-2 py-1">
            You are signed in as <span className="font-bold">{userEmail}</span>{' '}
            and subscribed to the{' '}
            <span className="text-primary font-bold">
              <PlanLabel />
            </span>{' '}
            plan.
          </SelectLabel>
          <SelectSeparator />
          <Link href="/dashboard">
            <SelectLabel className="hover:bg-slate-100 px-2 py-1">
              Dashboard
            </SelectLabel>
          </Link>
          <SelectSeparator />
          <Link href="/dashboard/account">
            <SelectLabel className="hover:bg-slate-100 px-2 py-1">
              Account
            </SelectLabel>
          </Link>
          <SelectSeparator />
          <Subscribed requireAdminSubscription>
            <SelectLabel
              onClick={openCustomerPortal}
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
