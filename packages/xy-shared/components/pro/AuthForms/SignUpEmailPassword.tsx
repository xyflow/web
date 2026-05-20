'use client';

import { FC, FormEvent, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Turnstile, turnstileError, TurnstileRef } from '../../turnstile';

import { Button } from '../../ui/button';
import { Input, InputLabel } from '../../ui/input';

import { AuthErrorNotification } from './AuthNotification';
import { signUp } from '../../../server-actions/sign-up-email-password';

const Signup: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const turnstileRef = useRef<TurnstileRef>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const turnstileToken = turnstileRef.current?.getResponse();

      if (!turnstileToken) {
        setError(turnstileError);
        return;
      }

      const result = await signUp(formData, turnstileToken);

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
        <InputLabel className="text-muted-foreground" htmlFor="email">
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
      <div className="">
        <InputLabel className="text-muted-foreground" htmlFor="password">
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
        <div className="text-light mt-2 text-sm">
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
      <Turnstile ref={turnstileRef} />
      <Button
        size="lg"
        className="mt-2 w-full"
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
