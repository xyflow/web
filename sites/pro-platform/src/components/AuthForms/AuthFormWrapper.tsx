import * as React from 'react';

import Link from 'next/link';

import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { SignInOAuth } from '@/components/AuthForms';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from 'xy-ui';

type AuthFormWrapperProps = {
  children?: React.ReactNode;
  links?: { href: string; label: string }[];
  showOAuth?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const AuthFormWrapper = ({
  children,
  links = [],
  showOAuth = true,
  title = null,
  description = null,
}: AuthFormWrapperProps) => {
  return (
    <div>
      <div className="flex flex-col items-center my-20">
        {/* <div className="mb-5 flex flex-col items-center">
          <Logo />
        </div> */}
        <Card className="max-w-sm w-full">
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            {children}
            {showOAuth && (
              <>
                <div className="relative flex py-3 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-muted-foreground">or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>
                <SignInOAuth />
              </>
            )}
          </CardContent>
        </Card>
        <div className="flex flex-col space-y-2 mt-5">
          {links.map((link) => (
            <div
              className="flex items-center space-x-1 hover:text-slate-800 text-muted-foreground text-sm font-bold cursor-pointer"
              key={link.href}
            >
              <ArrowLongRightIcon className="h-4 w-4" />
              <Link href={link.href}>{link.label}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
