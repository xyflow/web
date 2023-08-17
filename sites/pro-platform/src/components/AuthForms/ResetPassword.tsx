'use client';

import { useState } from 'react';
import { useResetPassword } from '@nhost/nextjs';

import { Button, Input, InputLabel } from 'xy-ui';
import { AuthErrorNotification, AuthNotification } from './AuthNotification';

function ResetPassword() {
  const [email, setEmail] = useState<string>('');
  const { resetPassword, isLoading, isSent, isError, error } = useResetPassword({ redirectTo: '/account' });

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    resetPassword(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && <AuthErrorNotification error={error} />}
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
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <Button disabled={isLoading} loading={isLoading} size="lg" className="w-full" type="submit" variant="react">
        Send Reset Link
      </Button>
    </form>
  );
}

export default ResetPassword;
