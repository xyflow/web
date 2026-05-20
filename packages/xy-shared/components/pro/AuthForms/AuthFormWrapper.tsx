import { ReactNode, Suspense } from 'react';

import Link from 'next/link';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import SignInOAuth from './SignInOAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Heading } from '../../ui/heading';
import { Text } from '../../ui/text';

import { ExpiredTokenNotification } from './AuthNotification';
import { getFramework } from '../../../lib/get-framework';

type AuthFormWrapperProps = {
  children?: ReactNode;
  links?: { href: string; label: string }[];
  showOAuth?: boolean;
  showHero?: boolean;
  title?: ReactNode;
  description?: ReactNode;
};

const { library } = getFramework();

const AuthFormWrapper = ({
  children,
  links = [],
  showOAuth = true,
  showHero = true,
  title = null,
  description = null,
}: AuthFormWrapperProps) => {
  return (
    <>
      <Suspense fallback={null}>
        <ExpiredTokenNotification />
      </Suspense>
      <div className="mt-10 flex">
        {showHero && (
          <div className="relative mt-6 hidden max-w-xl flex-1 p-4 lg:block">
            <Heading className="mb-4 font-black">
              Build Better Node-Based UIs with{' '}
              <span className="text-primary">{library}</span>
            </Heading>
            <Text size="lg">
              By subscribing to {library} Pro you are securing the maintenance and
              development of our open source libraries.
            </Text>
          </div>
        )}
        <div className="z-20 flex flex-1 flex-col items-center">
          {/* <div className="mb-5 flex flex-col items-center">
          <Logo />
        </div> */}
          <Card className="w-full max-w-sm">
            <CardHeader>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              {children}
              {showOAuth && (
                <>
                  <div className="relative flex items-center py-3">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="text-muted-foreground mx-4 flex-shrink">or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>
                  <SignInOAuth />
                </>
              )}
            </CardContent>
          </Card>
          <div className="mt-5 flex flex-col space-y-2">
            {links.map((link) => (
              <div
                className="hover:text-primary text-muted-foreground flex cursor-pointer items-center space-x-1 text-sm font-bold"
                key={link.href}
              >
                <ArrowLongRightIcon className="h-4 w-4" />
                <Link href={link.href}>{link.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthFormWrapper;
