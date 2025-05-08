'use client';

import { FormEvent, useState, useTransition } from 'react';
import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import { AuthErrorNotification, AuthNotification } from './AuthNotification';
import type { AuthErrorPayload } from '@nhost/nhost-js';
import { signInEmailPasswordless } from '@/server-actions';

function ResendVerificationLink() {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<AuthErrorPayload | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const { error } = await signInEmailPasswordless(email);
      setError(error);
      setIsSuccess(!error);
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
        />
      </div>
      <Button
        disabled={isLoading || isSuccess}
        loading={isLoading}
        size="lg"
        className="w-full"
        type="submit"
        variant="react"
      >
        Send Verification Link
      </Button>
    </form>
  );
}

export default ResendVerificationLink;
