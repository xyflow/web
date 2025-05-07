'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSignInEmailPasswordless } from '@nhost/react';
import { Button, Input, InputLabel } from '@xyflow/xy-ui';

import { AuthErrorNotification, AuthNotification } from './AuthNotification';

function ResendVerificationLink() {
  const defaultEmail = useSearchParams().get('email') ?? '';
  const [email, setEmail] = useState(defaultEmail);
  const { signInEmailPasswordless, isSuccess, isLoading, isError, error } =
    useSignInEmailPasswordless();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signInEmailPasswordless(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && <AuthErrorNotification error={error} />}
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
        Send Verification Link
      </Button>
    </form>
  );
}

export default ResendVerificationLink;
