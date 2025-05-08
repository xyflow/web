import { FC } from 'react';
import Link from 'next/link';
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from '@xyflow/xy-ui';
import { getNhost } from '@/utils/nhost';
import { UserIcon } from '@heroicons/react/24/solid';
import { PlanLabel, Subscribed } from '@/components/pro/SubscriptionStatus';
import { openStripeCustomerPortal, signOut } from '@/server-actions';

const NavMenu: FC = async () => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (!user) {
    return (
      <Button asChild variant="secondary">
        <Link href="/signin">Sign In / Sign Up</Link>
      </Button>
    );
  }
  return (
    <Select>
      <SelectTrigger className="w-auto">
        <UserIcon className="w-6 h-6 fill-gray-500" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel className="text-sm font-normal max-w-[200px] px-2 py-1">
            You are signed in as <span className="font-bold">{user.email}</span> and
            subscribed to the{' '}
            <span className="text-primary font-bold">
              <PlanLabel />
            </span>{' '}
            plan.
          </SelectLabel>
          <SelectSeparator />
          <Link href="/dashboard">
            <SelectLabel className="hover:bg-slate-100 px-2 py-1">Dashboard</SelectLabel>
          </Link>
          <SelectSeparator />
          <Link href="/dashboard/account">
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
