'use client';

import { useState } from 'react';
import { useResetPassword } from '@nhost/nextjs';

import { Button } from 'xy-ui';

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
      <div>
        <label htmlFor="email">Email</label>
        <input
          placeholder="Your Email"
          className="border border-gray-500 p-2 rounded w-full"
          id="email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <Button disabled={isLoading} type="submit" variant="react">
        Send Reset Link
      </Button>
    </form>
  );
}

export default ResetPassword;
