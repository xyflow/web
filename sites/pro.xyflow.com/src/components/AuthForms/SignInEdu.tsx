'use client';

import { useState } from 'react';
import { useSignInEmailPasswordless } from '@nhost/nextjs';

import Head from 'next/head';
import { Button, Input, InputLabel } from 'xy-ui';
import { AuthErrorNotification, MagicLinkSuccessNotification } from './AuthNotification';

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [metadata, setMetadata] = useState<{ student: boolean }>({ student: false });
  const { signInEmailPasswordless, isLoading, isSuccess, isError, error } = useSignInEmailPasswordless();

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    await signInEmailPasswordless(email, { metadata, redirectTo: '/' });
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <form onSubmit={handleSubmit}>
        {isError && <AuthErrorNotification error={error} />}
        {isSuccess && <MagicLinkSuccessNotification />}
        <div>
          <div className="mb-2">
            <InputLabel htmlFor="email">Your university mail</InputLabel>
            <Input
              variant="square"
              placeholder="Your Email"
              required
              id="email"
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              autoComplete="on"
            />
          </div>
          <div className="flex mb-4">
            <input
              className="shrink-0 w-4 h-4 mr-1 mb-auto mt-1"
              id="confirm"
              type="checkbox"
              required
              checked={metadata.student}
              onChange={(evt) => setMetadata({ ...metadata, student: evt.target.checked })}
            />
            <label className="text-muted-foreground text-sm" htmlFor="confirm">
              I confirm that I am using xyflow pro only for educational purposes.
            </label>
          </div>
        </div>
        <Button size="lg" className="w-full" disabled={isLoading} loading={isLoading} type="submit" variant="react">
          Sign Up
        </Button>
      </form>
    </>
  );
}

export default Signup;
