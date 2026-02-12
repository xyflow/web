'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { Input, InputLabel } from '../../ui/input';

import { AuthErrorNotification } from './AuthNotification';
import { signIn } from '../../../server-actions/sign-in-email-password';

const SignInEmailPassword: FC = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>();
  const [isLoading, startTransition] = useTransition();

  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const redirectTo = searchParams.get('redirectTo') ?? undefined;
      const result = await signIn(formData, redirectTo);

      if (result.redirect) {
        router.push(result.redirect);
      } else if (result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <AuthErrorNotification error={error} />}
      <div className="flex flex-col">
        <div className="mb-2">
          <InputLabel className="text-gray-800" htmlFor="email">
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
          <InputLabel className="text-gray-800" htmlFor="password">
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
          <div className="text-light text-sm mt-2">
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
          className="w-full mt-2"
          type="submit"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignInEmailPassword;
