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
      <div className="flex mt-10">
        {showHero && (
          <div className="hidden lg:block flex-1 max-w-xl mt-6 relative p-4">
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
        <div className="flex flex-1 flex-col items-center z-20">
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
    </>
  );
};

export default AuthFormWrapper;
