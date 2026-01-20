'use client';

import { FormEvent, useState, useTransition } from 'react';

import { AuthErrorNotification, AuthNotification } from './AuthNotification';
import { resetPassword } from '../../../server-actions/reset-password';
import { Button } from '../../ui/button';
import { InputLabel, Input } from '../../ui/input';

function ResetPassword() {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const response = await resetPassword(email);
      setError(response?.error);
      setIsSent(!response?.error);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <AuthErrorNotification error={error} />}
      {isSent && (
        <AuthNotification
          variant="success"
          title="We have sent you a link"
          description="Please check your email to reset your password."
        />
      )}
      <div className="mb-4">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          variant="square"
          placeholder="Your Email"
          id="email"
          name="email"
          disabled={isSent}
          type="email"
        />
      </div>
      <Button
        disabled={isLoading || isSent}
        loading={isLoading}
        size="lg"
        className="w-full"
        type="submit"
      >
        Send Reset Link
      </Button>
    </form>
  );
}

export default ResetPassword;
