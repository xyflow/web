'use client';

import { useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/nextjs';

import { Button, Input, InputLabel } from 'xy-ui';

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
      <div className="mb-2">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          variant="square"
          id="email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          autoComplete="on"
          placeholder="Your Email"
          required
        />
      </div>
      <div className="mb-4">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          variant="square"
          id="password"
          type="password"
          value={password}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)}
          placeholder="Your Password"
          required
        />
      </div>
      <Button size="lg" className="w-full" disabled={isLoading} type="submit" variant="react">
        Sign Up
      </Button>
    </form>
  );
}

export default Signup;
