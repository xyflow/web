import * as React from 'react';

import Link from 'next/link';

import Logo from '@/components/Logo';
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
        <div className="mb-5 flex flex-col items-center">
          <Logo />
        </div>
        <Card className="max-w-sm w-full">
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>{children}</CardContent>
          {showOAuth && (
            <CardFooter>
              <SignInOAuth />
            </CardFooter>
          )}
        </Card>
        <div className="mt-5">
          {links.map((link) => (
            <div key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
