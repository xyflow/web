'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

import { UserIcon } from '@heroicons/react/24/solid';

import { nhostOnClient } from '../../lib/nhost-on-client';
import { Subscribed } from '../pro/SubscriptionStatus';
import { openStripeCustomerPortal } from '../../server-actions/open-stripe-customer-portal';
import { cn } from '../../lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';

const accountMenuItemClass =
  'group/account-item flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted focus:bg-muted focus:outline-none';

const accountMenuDestructiveItemClass =
  'text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive';

export function AccountNavMenu() {
  return (
    <NavigationMenu className="h-full w-full flex-none">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuPrimitive.Trigger className="flex h-full select-none items-center rounded-sm px-2 py-1 text-sm font-medium">
            <UserIcon className="animate-fade-in m-2" height="18" />
          </NavigationMenuPrimitive.Trigger>
          <NavigationMenuContent className="bg-background left-auto right-0 rounded-xl p-2 shadow-2xl md:w-44">
            <div className="grid gap-1">
              <NavigationMenuLink asChild>
                <Link href="/pro/dashboard" className={accountMenuItemClass}>
                  Dashboard
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link href="/pro/account" className={accountMenuItemClass}>
                  Account
                </Link>
              </NavigationMenuLink>

              <Subscribed requireAdminSubscription>
                <NavigationMenuLink asChild className="cursor-pointer">
                  <button
                    type="button"
                    className={accountMenuItemClass}
                    onClick={openStripeCustomerPortal}
                  >
                    Billing
                  </button>
                </NavigationMenuLink>
              </Subscribed>

              <div className="bg-border my-1 h-px" />

              <NavigationMenuLink asChild>
                <button
                  type="button"
                  className={cn(
                    accountMenuItemClass,
                    accountMenuDestructiveItemClass,
                    'cursor-pointer',
                  )}
                  onClick={async () => {
                    await nhostOnClient.auth.signOut({
                      refreshToken: nhostOnClient.getUserSession()?.refreshToken,
                    });
                    nhostOnClient.clearSession();
                    redirect('/');
                  }}
                >
                  Logout
                </button>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
