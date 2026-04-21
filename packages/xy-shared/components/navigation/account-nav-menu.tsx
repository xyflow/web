import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

import {
  ArrowRightStartOnRectangleIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';

import { nhostOnClient } from '../../lib/nhost-on-client';
import { cn } from '../../lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';
// import { Session } from '@nhost/nhost-js/session';

const accountMenuItemClass =
  'group/account-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-foreground transition-colors hover:bg-muted focus:bg-muted focus:outline-none';

const accountMenuAccentClass =
  'transition-colors group-hover/account-item:text-primary group-focus/account-item:text-primary';

export function AccountNavMenu(/*{ session }: { session: Session }*/) {
  // const email = session.user?.email;

  return (
    <NavigationMenu className="h-full w-full flex-none">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuPrimitive.Trigger className="flex h-full select-none items-center rounded-sm px-2 py-1 text-sm font-medium">
            <UserIcon className="animate-fade-in m-2" height="18" />
          </NavigationMenuPrimitive.Trigger>
          <NavigationMenuContent className="bg-background border-border left-auto right-0 rounded-xl border p-2 shadow-2xl md:w-48">
            <div className="grid gap-1">
              {/* TODO: Add email to account menu? */}
              {/* {email ? (
                <p
                  className="text-muted-foreground px-3 pb-2 pt-1 text-xs leading-snug"
                  title={email}
                >
                  You are signed in as
                  <p className="text-foreground font-medium">{email}</p>
                </p>
              ) : null} */}
              <NavigationMenuLink asChild>
                <Link href="/pro/dashboard" className={accountMenuItemClass}>
                  <Squares2X2Icon
                    className={cn(
                      'text-muted-foreground h-5 w-5 shrink-0',
                      accountMenuAccentClass,
                    )}
                  />
                  <span className={cn('text-sm font-semibold', accountMenuAccentClass)}>
                    Dashboard
                  </span>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild>
                <Link href="/pro/account" className={accountMenuItemClass}>
                  <UserCircleIcon
                    className={cn(
                      'text-muted-foreground h-5 w-5 shrink-0',
                      accountMenuAccentClass,
                    )}
                  />
                  <span className={cn('text-sm font-semibold', accountMenuAccentClass)}>
                    Account
                  </span>
                </Link>
              </NavigationMenuLink>
              <div className="bg-border my-1 h-px" />

              <NavigationMenuLink asChild>
                <button
                  type="button"
                  className={cn(accountMenuItemClass, 'cursor-pointer')}
                  onClick={async () => {
                    await nhostOnClient.auth.signOut({
                      refreshToken: nhostOnClient.getUserSession()?.refreshToken,
                    });
                    nhostOnClient.clearSession();
                    window.location.reload();
                  }}
                >
                  <ArrowRightStartOnRectangleIcon
                    className={cn(
                      'text-muted-foreground h-5 w-5 shrink-0',
                      accountMenuAccentClass,
                    )}
                  />
                  <span className={cn('text-sm font-semibold', accountMenuAccentClass)}>
                    Logout
                  </span>
                </button>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
