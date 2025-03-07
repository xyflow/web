'use client';

import { FC, useState } from 'react';
import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import { useSignInEmailPasswordless } from '@nhost/react';

import { MagicLinkSuccessNotification } from './AuthNotification';
import { redirect } from 'next/navigation';

const SignInMagicLink: FC = () => {
  const [email, setEmail] = useState('');
  const { signInEmailPasswordless, isSuccess, isLoading } =
    useSignInEmailPasswordless();

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const onSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signInEmailPasswordless(email);
  };

  if (isSuccess) {
    redirect(`/email-verification?email=${email}`);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col space-y-4 mb-2">
        {isSuccess ? (
          <MagicLinkSuccessNotification />
        ) : (
          <>
            <div>
              <InputLabel className="text-gray-800" htmlFor="email">
                Email
              </InputLabel>
              <Input
                required
                variant="square"
                value={email}
                onChange={onChange}
                id="email"
                placeholder="Email"
                type="email"
              />
            </div>

            <Button
              disabled={isLoading}
              loading={isLoading}
              size="lg"
              className="w-full shrink-0"
              type="submit"
              variant="react"
            >
              Send secure link
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default SignInMagicLink;
