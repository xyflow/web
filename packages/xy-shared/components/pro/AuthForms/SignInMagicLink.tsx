'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import { Button } from '../../ui/button';
import { Input, InputLabel } from '../../ui/input';

import {
  AuthErrorNotification,
  AuthNotification,
  MagicLinkSuccessNotification,
} from './AuthNotification';
import { nhostOnClient } from '../../../lib/nhost-on-client';
import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

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

      try {
        await nhostOnClient.auth.signInPasswordlessEmail({ email });
        setIsSuccess(true);
      } catch (err: unknown) {
        const error = err as FetchError<ErrorResponse>;
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2 flex flex-col space-y-4">
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
          <InputLabel className="text-muted-foreground" htmlFor="email">
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
