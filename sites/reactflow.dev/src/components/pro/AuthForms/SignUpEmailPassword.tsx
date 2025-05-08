'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import Link from 'next/link';
import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import type { AuthErrorPayload } from '@nhost/nhost-js';
import { AuthErrorNotification } from './AuthNotification';
import { signUp } from '@/server-actions';

const Signup: FC = () => {
  const [error, setError] = useState<AuthErrorPayload>();
  const [isLoading, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      setError(await signUp(formData));
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <AuthErrorNotification error={error} />}
      <div className="mb-2">
        <InputLabel className="text-gray-800" htmlFor="email">
          Email
        </InputLabel>
        <Input
          variant="square"
          name="email"
          disabled={isLoading}
          type="email"
          autoComplete="on"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-4">
        <InputLabel className="text-gray-800" htmlFor="password">
          Password
        </InputLabel>
        <Input
          variant="square"
          name="password"
          disabled={isLoading}
          type="password"
          placeholder="Password"
          required
        />
        <div className="text-light text-sm mt-2">
          By signing up, you agree to our{' '}
          <Link
            href="https://xyflow.com/terms-of-use"
            className="text-primary hover:underline"
          >
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link
            href="https://xyflow.com/privacy"
            className="text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>

      <Button
        size="lg"
        className="w-full mt-2"
        disabled={isLoading}
        loading={isLoading}
        type="submit"
        variant="react"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
