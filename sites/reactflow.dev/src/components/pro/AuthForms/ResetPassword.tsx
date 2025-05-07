'use client';

import { useState } from 'react';
import { useResetPassword } from '@nhost/react';

import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import { AuthErrorNotification, AuthNotification } from './AuthNotification';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const { resetPassword, isLoading, isSent, isError, error } = useResetPassword();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    resetPassword(email, { redirectTo: '/account' });
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
      <Button
        disabled={isLoading}
        loading={isLoading}
        size="lg"
        className="w-full"
        type="submit"
        variant="react"
      >
        Send Reset Link
      </Button>
    </form>
  );
}

export default ResetPassword;
