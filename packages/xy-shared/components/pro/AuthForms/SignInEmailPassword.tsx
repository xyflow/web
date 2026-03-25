'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Input, InputLabel } from '../../ui/input';

import { AuthErrorNotification } from './AuthNotification';
import { nhostOnClient } from '../../../lib/nhost-on-client';
import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

const SignInEmailPassword: FC = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>();
  const [isLoading, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      let redirectTo: string | undefined =
        searchParams.get('redirectTo') ?? '/pro/dashboard';

      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      try {
        await nhostOnClient.auth.signInEmailPassword({
          email,
          password,
        });
      } catch (err: unknown) {
        const error = err as FetchError<ErrorResponse>;
        if (error instanceof FetchError && error.body.error === 'unverified-user') {
          redirectTo = `/pro/email-verification?email=${encodeURIComponent(email)}`;
        } else {
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
          redirectTo = undefined;
        }
      } finally {
        // we have to call redirect here otherwise next throws an error
        if (redirectTo) redirect(redirectTo);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <AuthErrorNotification error={error} />}
      <div className="flex flex-col">
        <div className="mb-2">
          <InputLabel className="text-muted-foreground" htmlFor="email">
            Email
          </InputLabel>
          <Input
            id="email"
            name="email"
            disabled={isLoading}
            type="email"
            autoComplete="on"
            placeholder="Email"
            required
            variant="square"
          />
        </div>
        <div className="mb-4">
          <InputLabel className="text-muted-foreground" htmlFor="password">
            Password
          </InputLabel>
          <Input
            id="password"
            name="password"
            disabled={isLoading}
            type="password"
            placeholder="Password"
            required
            variant="square"
          />
          <div className="text-light mt-2 text-sm">
            Having trouble signing in?{' '}
            <Link href="/pro/reset-password" className="text-primary hover:underline">
              Reset your password
            </Link>{' '}
            or{' '}
            <Link href="/pro/sign-in/magic-link" className="text-primary hover:underline">
              get a magic link
            </Link>
            .
          </div>
        </div>
        <Button
          loading={isLoading}
          disabled={isLoading}
          size="lg"
          className="mt-2 w-full"
          type="submit"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignInEmailPassword;
