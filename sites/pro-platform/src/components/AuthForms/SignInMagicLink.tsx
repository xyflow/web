'use client';

import { useState } from 'react';
import { Button, Input, InputLabel } from 'xy-ui';
import { useSignInEmailPasswordless } from '@nhost/nextjs';

import Notification from '@/components/Notification';

const SignInMagicLink = () => {
  const [email, setEmail] = useState<string>('');
  const { signInEmailPasswordless, isSuccess, isLoading } = useSignInEmailPasswordless();

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
        {isSuccess && (
          <Notification
            className="rounded-md font-sm bg-green-100 border-green-500 text-green-700"
            title="We have sent you a link"
            description="Please check your email to sign in."
          />
        )}
        {!isSuccess && (
          <>
            <div>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                required
                variant="square"
                value={email}
                onChange={onChange}
                id="email"
                placeholder="Your Email"
                type="email"
              />
            </div>

            <Button disabled={isLoading} size="lg" className="w-full shrink-0" type="submit" variant="react">
              {isLoading ? 'Please wait...' : 'Send Secure Link'}
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default SignInMagicLink;
