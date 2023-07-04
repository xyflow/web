import Link from 'next/link';

import Logo from '@/components/Logo';
import { SignInOAuth } from '@/components/AuthForms';

import { Card } from 'xy-ui';

type AuthFormWrapperProps = {
  children?: React.ReactNode;
  links?: { href: string; label: string }[];
  showOAuth?: boolean;
  title?: React.ReactNode;
};

const AuthFormWrapper = ({ children, links = [], showOAuth = true, title = null }: AuthFormWrapperProps) => {
  return (
    <div>
      <div className="flex flex-col items-center my-20">
        <div className="mb-5 flex flex-col items-center">
          <Logo />
          {title && <div className="font-black text-xl mb-3">{title}</div>}
        </div>
        <Card className="p-5 max-w-sm w-full">
          {children}
          {showOAuth && <SignInOAuth />}
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
