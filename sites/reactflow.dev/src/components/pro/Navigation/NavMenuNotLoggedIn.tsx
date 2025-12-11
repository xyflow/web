'use client';

import { type ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Button } from 'xy-shared';

const buttonProps: ComponentProps<typeof Button> = {
  asChild: true,
  variant: 'secondary',
  // Set fixed width to avoid navbar shifts on Sign In / Sign Out button click
  className: 'w-[80px] text-nowrap',
};

export function NavMenuNotLoggedIn() {
  const pathname = usePathname();

  return (
    <>
      {(() => {
        switch (pathname) {
          case '/pro':
          case '/pro/sign-in':
            return (
              <Button {...buttonProps}>
                <Link href="/pro/sign-up">Sign Up</Link>
              </Button>
            );
          case '/pro/sign-up':
          case '/pro/sign-in/magic-link':
          case '/pro/reset-password':
            return (
              <Button {...buttonProps}>
                <Link href="/pro/sign-in">Sign In</Link>
              </Button>
            );
          default:
            return (
              <Button asChild className="px-4 flex gap-1">
                <Link href="/pro">
                  <SparklesIcon height="16" />
                  <span className="max-[1100px]:hidden">React Flow</span>
                  Pro
                </Link>
              </Button>
            );
        }
      })()}
    </>
  );
}
