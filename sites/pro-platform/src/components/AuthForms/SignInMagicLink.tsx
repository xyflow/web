'use client';

import { useState } from 'react';
import { Button, Input, InputLabel } from 'xy-ui';
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
      <div className="flex flex-col space-y-4 mb-2">
        {isSuccess && <Notification description="Please check your email for a magic link!" />}
        <div>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input variant="square" value={email} onChange={onChange} id="email" placeholder="Your Email" type="email" />
        </div>
        <Button className="rounded-lg w-full shrink-0" type="submit" variant="react">
          Send Secure Link
        </Button>
      </div>
    </form>
  );
};

export default SignInMagicLink;
