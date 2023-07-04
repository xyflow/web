'use client';

import { useState } from 'react';
import { Button } from 'xy-ui';
import { useSignInEmailPasswordless } from '@nhost/nextjs';

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
        {isSuccess && <div>Please check your email for a magic link!</div>}
        <div className="mb-4">
          Enter your email to sign in or create an account. You will receive a mail with a login link.
        </div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={onChange}
          id="email"
          className="border border-gray-500 p-2 rounded w-full"
          placeholder="Your Email"
          type="email"
        />
      </div>
      <Button type="submit" variant="react">
        Sign In
      </Button>
    </form>
  );
};

export default SignInMagicLink;
