'use client';

import { ReactNode, startTransition, useEffect, useState } from 'react';
import { createNhostClient } from '@nhost/nhost-js';
import { CookieStorage, Session } from '@nhost/nhost-js/session';

import { type ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { getFramework } from '../../lib/get-framework';
import { Button } from '../ui/button';

const buttonProps: ComponentProps<typeof Button> = {
  asChild: true,
  variant: 'secondary',
  // Set fixed width to avoid navbar shifts on Sign In / Sign Out button click
  className:
    'opacity-0 w-[calc(100%-2px)] h-[calc(100%-2px)] text-nowrap animate-reveal-rtl shadow-none',
};

const nhost = createNhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  region: process.env.NEXT_PUBLIC_NHOST_REGION!,
  storage: new CookieStorage({
    secure: process.env.NODE_ENV === 'production',
  }),
});

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
import { cn } from '../../lib/utils';
import { redirect } from 'next/navigation';
import clsx from 'clsx';

const { library } = getFramework();

function getButtonContent(
  session: Session | undefined | null,
  pathname: string,
): { component: ReactNode; width: number } {
  if (session === undefined) {
    return {
      component: <></>,
      width: 40,
    };
  }

  if (session) {
    return {
      component: <UserIcon className="animate-fade-in" height="18" />,
      width: 40,
    };
  }

  switch (pathname) {
    case '/pro/sign-in':
    case '/pro/sign-in/magic-link':
      return {
        component: (
          <Button {...buttonProps}>
            <Link href="/pro/sign-up">Sign Up</Link>
          </Button>
        ),
        width: 80,
      };
    case '/pro':
    case '/pro/sign-up':
    case '/pro/reset-password':
      return {
        component: (
          <Button {...buttonProps}>
            <Link href="/pro/sign-in">Sign In</Link>
          </Button>
        ),
        width: 80,
      };
    default:
      return {
        component: (
          <Button asChild className={clsx('pl-3 pr-4 flex gap-1', buttonProps.className)}>
            <Link href="/pro">
              <SparklesIcon height="16" />
              <span className="max-[1100px]:hidden">{library}</span>
              Pro
            </Link>
          </Button>
        ),
        width: 145,
      };
  }
}

export function NavMenu() {
  const [session, setSession] = useState<Session | undefined | null>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => {
      setSession(nhost.getUserSession());
    });
  }, []);

  const { component, width } = getButtonContent(session, pathname);

  return (
    <Menubar
      className="border-0 bg-transparent p-0 shadow-none transition-all duration-500"
      style={{ width: `${width}px` }}
    >
      <MenubarMenu>
        <MenubarTrigger
          className={cn(
            'animate-pulse xy-gradient-pill rounded-full p-0 w-full h-10 text-md cursor-pointer flex items-center justify-center shadow-none',
            { 'xy-gradient-pill--loaded animate-none': session !== undefined }, // loading state
          )}
        >
          {component}
        </MenubarTrigger>
        {session && (
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
                redirect('/');
              }}
            >
              Logout
            </MenubarItem>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
}
