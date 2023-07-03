import Link from 'next/link';

import Logo from '@/components/Logo';
import { SignInEmailPassword, SignInOAuth } from '@/components/AuthForms';

const SignInPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center my-20">
        <div className="mb-5">
          <Logo />
        </div>
        <div className="p-5 rounded border border-gray-500">
          <SignInEmailPassword />
          <SignInOAuth />
        </div>
        <Link href="/signin">Login without password</Link>
        <Link href="/signup">Don't have an account? Sign Up</Link>
        <Link href="/reset-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default SignInPage;
