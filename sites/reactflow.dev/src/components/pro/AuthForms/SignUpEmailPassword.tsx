'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, InputLabel } from 'xy-shared';

import { AuthErrorNotification } from './AuthNotification';
import { signUp } from '@/server-actions';

const Signup: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const result = await signUp(formData);

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

      <div className="mb-2">
        <InputLabel className="text-gray-800" htmlFor="email">
          Email
        </InputLabel>
        <Input
          variant="square"
          id="email"
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
          id="password"
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
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
