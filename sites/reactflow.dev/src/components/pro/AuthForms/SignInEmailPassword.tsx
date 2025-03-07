'use client';

import { FC, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSignInEmailPassword } from '@nhost/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import { AuthErrorNotification } from './AuthNotification';

const SignInEmailPassword: FC = () => {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleFormSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signInEmailPassword(form.email, form.password);
  };

  if (needsEmailVerification) {
    redirect(`/email-verification?email=${form.email}`);
  }

  if (isSuccess) {
    redirect(searchParams.get('redirectTo') || '/dashboard');
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {isError && <AuthErrorNotification error={error} />}
      <div className="flex flex-col">
        <div className="mb-2">
          <InputLabel className="text-gray-800" htmlFor="email">
            Email
          </InputLabel>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(evt) => setForm({ ...form, email: evt.target.value })}
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
            type="password"
            value={form.password}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, password: evt.target.value })
            }
            placeholder="Password"
            required
            variant="square"
          />
          <div className="text-light text-sm mt-2">
            Having trouble signing in?{' '}
            <Link
              href="/reset-password"
              className="text-primary hover:underline"
            >
              Reset your password
            </Link>{' '}
            or{' '}
            <Link
              href="/signin/magic-link"
              className="text-primary hover:underline"
            >
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
          variant="react"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};

export default SignInEmailPassword;
