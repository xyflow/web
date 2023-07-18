'use client';

import { useState } from 'react';
import { useResetPassword } from '@nhost/nextjs';

import { Button, Input, InputLabel } from 'xy-ui';

function ResetPassword() {
  const [email, setEmail] = useState<string>('');
  const { resetPassword, isLoading, isSent, isError, error } = useResetPassword({ redirectTo: '/change-password' });

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    resetPassword(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && error && <div>{error.message}</div>}
      {isSent && <div>Please check your inbox to set a new password.</div>}
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
      <Button size="lg" className="w-full" disabled={isLoading} type="submit" variant="react">
        Send Reset Link
      </Button>
    </form>
  );
}

export default ResetPassword;
