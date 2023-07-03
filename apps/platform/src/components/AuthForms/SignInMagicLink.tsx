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

  if (isSuccess) {
    return <p>Check your email for a magic link!</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
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
      <Button type="submit" variant="outline">
        Sign In
      </Button>
    </form>
  );
};

export default SignInMagicLink;
