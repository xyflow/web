'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import { Button } from '../../ui/button';
import { Input, InputLabel } from '../../ui/input';

import { signInEmailPasswordless } from '../../../server-actions';
import {
  AuthErrorNotification,
  AuthNotification,
  MagicLinkSuccessNotification,
} from './AuthNotification';

const SignInMagicLink: FC = () => {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const result = await signInEmailPasswordless(email);
      setError(result?.error);
      setIsSuccess(result?.error ? false : true);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 mb-2">
        {error && <AuthErrorNotification error={error} />}
        {error && (
          <AuthNotification
            title="Something went wrong"
            description={error}
            variant="error"
          />
        )}
        {isSuccess && <MagicLinkSuccessNotification />}
        <div>
          <InputLabel className="text-gray-800" htmlFor="email">
            Email
          </InputLabel>
          <Input
            required
            variant="square"
            name="email"
            id="email"
            placeholder="Email"
            disabled={isSuccess}
            type="email"
          />
        </div>

        <Button
          disabled={isLoading || isSuccess}
          loading={isLoading}
          size="lg"
          className="w-full shrink-0"
          type="submit"
        >
          Send secure link
        </Button>
      </div>
    </form>
  );
};

export default SignInMagicLink;
