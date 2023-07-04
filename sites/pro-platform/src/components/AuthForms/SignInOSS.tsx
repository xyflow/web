'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { useSignInEmailPasswordless } from '@nhost/nextjs';

import { Button } from 'xy-ui';

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [metadata, setMetadata] = useState<{ openSource: boolean; url: string }>({ openSource: false, url: '' });
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
      <div className="my-5 text-center">
        This is intended for non-commercial open source projects. If you are a business or private user of React Flow,
        please use the <Link href="/signin">regular sign up</Link>.
      </div>

      <form onSubmit={handleSubmit}>
        {isError && error && <div>{error.message}</div>}
        {isSuccess && (
          <div>To complete your registration, please check your mailbox and click the link we have sent you.</div>
        )}
        <div>
          <label htmlFor="email">Project Url</label>
          <input
            required
            id="url"
            type="url"
            value={metadata.url}
            onChange={(evt) => setMetadata({ ...metadata, url: evt.target.value })}
            placeholder="Your Project Url"
            className="border border-gray-500 p-2 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="email">Contact Email</label>
          <input
            required
            id="email"
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            autoComplete="on"
            placeholder="Your Email"
            className="border border-gray-500 p-2 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="confirm">
            <input
              type="checkbox"
              required
              checked={metadata.openSource}
              onChange={(evt) => setMetadata({ ...metadata, openSource: evt.target.checked })}
            ></input>
            I confirm that I am using React Flow Pro only for non-commercial purposes in this open source project
          </label>
        </div>
        <Button disabled={isLoading} type="submit" variant="react">
          Sign Up
        </Button>
      </form>
    </>
  );
}

export default Signup;
