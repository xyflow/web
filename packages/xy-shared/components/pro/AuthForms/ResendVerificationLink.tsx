'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import { AuthErrorNotification, AuthNotification } from './AuthNotification';
import { Input, InputLabel } from '../../ui/input';
import { Button } from '../../ui/button';
import { nhostOnClient } from '../../../lib/nhost-on-client';
import { FetchError } from '@nhost/nhost-js/fetch';
import { ErrorResponse } from '@nhost/nhost-js/auth';

function ResendVerificationLink() {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();

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
      {error && <AuthErrorNotification error={error} />}
      {isSuccess && (
        <AuthNotification
          variant="success"
          title="We have sent you a link"
          description="Please check your email to sign in."
        />
      )}
      <div className="mb-4">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          variant="square"
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          disabled={isSuccess}
          defaultValue={(searchParams.get('email') as string | null) || ''}
        />
      </div>
      <Button
        disabled={isLoading || isSuccess}
        loading={isLoading}
        size="lg"
        className="w-full"
        type="submit"
      >
        Send Verification Link
      </Button>
    </form>
  );
}

export default ResendVerificationLink;
