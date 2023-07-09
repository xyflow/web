'use client';

import { useState } from 'react';
import { Button } from 'xy-ui';
import { useSignInEmailPasswordless } from '@nhost/nextjs';
import Notification from '@/components/Notification';

const SignInMagicLink = () => {
  const [email, setEmail] = useState<string>('');
  const { signInEmailPasswordless, isSuccess } = useSignInEmailPasswordless();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const onSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signInEmailPasswordless(email);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        {isSuccess && <Notification description="Please check your email for a magic link!" />}
        <div className="flex">
          <input
            value={email}
            onChange={onChange}
            id="email"
            className="border px-4 py-2 rounded-full rounded-r-none border-r-0 w-full"
            placeholder="Your Email"
            type="email"
          />
          <Button className="shrink-0 rounded-l-none" type="submit" variant="react">
            Sign In
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignInMagicLink;
