'use client';

import { useState } from 'react';
import { useSignInEmailPasswordless } from '@nhost/nextjs';

import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'xy-ui';

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
        {isError && error && <div>{error.message}</div>}
        {isSuccess && (
          <div>To complete your registration, please check your mailbox and click the link we have sent you.</div>
        )}
        <div>
          <div>
            <label htmlFor="email">Your university mail</label>
            <input
              placeholder="Your Email"
              className="border border-gray-500 p-2 rounded w-full"
              required
              id="email"
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              autoComplete="on"
            />
          </div>
          <div>
            <label htmlFor="confirm">
              <input
                id="confirm"
                type="checkbox"
                required
                checked={metadata.student}
                onChange={(evt) => setMetadata({ ...metadata, student: evt.target.checked })}
              />
              I confirm that I am using xyflow pro only for educational purposes
            </label>
          </div>
        </div>
        <Button disabled={isLoading} type="submit" variant="react">
          Sign Up
        </Button>
      </form>
    </>
  );
}

export default Signup;
