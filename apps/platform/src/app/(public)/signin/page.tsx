import Link from 'next/link';

import Logo from '@/components/Logo';
import { SignInMagicLink, SignInOAuth } from '@/components/AuthForms';

const SignInPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center my-20">
        <div className="mb-5">
          <Logo />
        </div>
        <div className="w-full max-w-sm p-5 rounded border border-gray-500">
          <SignInMagicLink />
          <SignInOAuth />
        </div>
        <Link href="/signin/email-password">Use Email + Password</Link>
      </div>
    </div>
  );
};

export default SignInPage;
