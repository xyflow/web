'use client';

import {
  ReactNode,
  startTransition,
  useEffect,
  useState,
  type ComponentProps,
} from 'react';
import { usePathname, redirect } from 'next/navigation';
import Link from 'next/link';
import { Session } from '@nhost/nhost-js/session';

import { UserIcon } from '@heroicons/react/24/solid';
import { SparklesIcon } from '@heroicons/react/24/solid';

import { Subscribed } from '../pro/SubscriptionStatus';
import { getFramework } from '../../lib/get-framework';
import { nhostOnClient } from '../../lib/nhost-on-client';
import { openStripeCustomerPortal } from '../../server-actions/open-stripe-customer-portal';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../ui/menubar';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const { library } = getFramework();

const buttonProps: ComponentProps<typeof Button> = {
  asChild: true,
  variant: 'secondary',
  // Set fixed width to avoid navbar shifts on Sign In / Sign Out button click
  className:
    'opacity-0 w-[calc(100%-2px)] h-[calc(100%-2px)] text-nowrap animate-reveal-rtl shadow-none',
};

function getButtonContent(
  session: Session | undefined | null,
  pathname: string,
): { component: ReactNode; width: number; disableOutline?: boolean } {
  if (session === undefined) {
    return {
      component: <></>,
      width: 40,
    };
  }

  if (session) {
    return {
      component: <AccountMenu />,
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
          <Button asChild className={cn('flex gap-1 pl-3 pr-4', buttonProps.className)}>
            <Link href="/pro">
              <SparklesIcon height="16" />
              <span className="max-[1100px]:hidden">{library}</span>
              Pro
            </Link>
          </Button>
        ),
        width: 145,
        disableOutline: true,
      };
  }
}

function AccountMenu() {
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

export function NavMenu() {
  const [session, setSession] = useState<Session | undefined | null>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => {
      setSession(nhostOnClient.getUserSession());
    });

    const unsubscribe = nhostOnClient.sessionStorage.onChange((session) => {
      setSession(session);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const { component, width, disableOutline } = getButtonContent(session, pathname);

  return (
    <div
      style={{ width: `${width}px` }}
      className={cn(
        'xy-animated-outline flex h-10 animate-pulse cursor-pointer items-center justify-center rounded-full p-0 transition-all duration-500',
        {
          'xy-animated-outline--loaded animate-none': session !== undefined,
          'xy-animated-outline--disabled': disableOutline,
        },
      )}
    >
      {component}
    </div>
  );
}
