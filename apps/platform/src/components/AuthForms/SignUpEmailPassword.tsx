'use client';

import { useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/nextjs';

import { Button } from 'xy-ui';

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signUpEmailPassword, isLoading, needsEmailVerification, isSuccess, isError, error } =
    useSignUpEmailPassword();

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    await signUpEmailPassword(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && error && <div>{error.message}</div>}
      {(isSuccess || needsEmailVerification) && (
        <div>To complete your registration, please check your mailbox and click the link we have sent you.</div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          autoComplete="on"
          placeholder="Your Email"
          required
          className="border border-gray-500 p-2 rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)}
          className="border border-gray-500 p-2 rounded w-full"
          placeholder="Your Password"
          required
        />
      </div>
      <Button disabled={isLoading} type="submit" variant="react">
        Sign Up
      </Button>
    </form>
  );
}

export default Signup;
