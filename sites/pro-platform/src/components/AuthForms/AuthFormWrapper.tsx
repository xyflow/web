import * as React from 'react';

import Link from 'next/link';

import { ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { SignInOAuth } from '@/components/AuthForms';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, Heading, Text } from 'xy-ui';

type AuthFormWrapperProps = {
  children?: React.ReactNode;
  links?: { href: string; label: string }[];
  showOAuth?: boolean;
  showHero?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const AuthFormWrapper = ({
  children,
  links = [],
  showOAuth = true,
  showHero = true,
  title = null,
  description = null,
}: AuthFormWrapperProps) => {
  return (
    <div className="relative overflow-hidden -m-4 min-h-[70vh]">
      <div
        className="absolute opacity-10 w-[100vw] h-[70vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
        }}
      />
      <div className="flex max-w-6xl mx-auto my-20">
        {showHero && (
          <div className="hidden lg:block flex-1 max-w-xl mt-6 relative p-4">
            <h3 className="text-md font-black mb-2 flex items-center">
              xyflow<span className="text-react">pro</span>
            </h3>
            <Heading className="mb-4 font-black">
              Build Better Node-Based UIs with <span className="text-react">React Flow</span>
            </Heading>
            <Text size="lg">
              By subscribing to xyflow pro you are securing the maintanance and development of our open source
              libraries.
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
    </div>
  );
};

export default AuthFormWrapper;
