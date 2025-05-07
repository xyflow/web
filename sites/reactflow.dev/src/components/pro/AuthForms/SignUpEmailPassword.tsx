'use client';

import { FC, useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/react';
import Link from 'next/link';

import { Button, Input, InputLabel } from '@xyflow/xy-ui';
import { redirect } from 'next/navigation';

import { AuthErrorNotification } from './AuthNotification';

const Signup: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    signUpEmailPassword,
    isLoading,
    isError,
    needsEmailVerification,
    isSuccess,
    error,
  } = useSignUpEmailPassword();

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    await signUpEmailPassword(email, password);
  };

  if (needsEmailVerification) {
    const queryParams = email ? `?email=${email}` : '';
    redirect(`/email-verification${queryParams}`);
  }

  if (isSuccess) {
    redirect('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      {isError && <AuthErrorNotification error={error} />}
      <div className="mb-2">
        <InputLabel className="text-gray-800" htmlFor="email">
          Email
        </InputLabel>
        <Input
          variant="square"
          id="email"
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          autoComplete="on"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-4">
        <InputLabel className="text-gray-800" htmlFor="password">
          Password
        </InputLabel>
        <Input
          variant="square"
          id="password"
          type="password"
          value={password}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(evt.target.value)
          }
          placeholder="Password"
          required
        />
        <div className="text-light text-sm mt-2">
          By signing up, you agree to our{' '}
          <Link
            href="https://www.xyflow.com/terms-of-use"
            className="text-primary hover:underline"
          >
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.xyflow.com/privacy"
            className="text-primary hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>

      <Button
        size="lg"
        className="w-full mt-2"
        disabled={isLoading || needsEmailVerification}
        loading={isLoading}
        type="submit"
        variant="react"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
