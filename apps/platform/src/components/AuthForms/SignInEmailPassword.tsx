'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignInEmailPassword, useSendVerificationEmail } from '@nhost/nextjs';

import Link from 'next/link';
import { Button } from 'xy-ui';

function SignInEmailPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const { signInEmailPassword, isLoading, needsEmailVerification, isSuccess, isError, error } =
    useSignInEmailPassword();
  const { sendEmail, isLoading: isVerificationMailLoading } = useSendVerificationEmail();

  useEffect(() => {
    if (isSuccess) {
      router.push(searchParams?.get('redirectTo') || '/');
    }
  }, [isSuccess, router, searchParams]);

  const handleFormSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signInEmailPassword(form.email, form.password);
  };

  const handleVerificationMail = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    await sendEmail(form.email);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {isError && <div>{error?.message}</div>}
      {needsEmailVerification && (
        <div>
          <div>Your email has not been verified. Please check your mailbox.</div>
          <div>
            <Button onClick={handleVerificationMail}>Resend verification mail</Button>
          </div>
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(evt) => setForm({ ...form, email: evt.target.value })}
          autoComplete="on"
          className="border border-gray-500 p-2 rounded w-full"
          placeholder="Your Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: evt.target.value })}
          className="border border-gray-500 p-2 rounded w-full"
          placeholder="Your Password"
          required
        />
        <Link href="/reset-password">Forgot Password?</Link>
      </div>
      <Button type="submit" variant="react">
        Sign in
      </Button>
    </form>
  );
}

export default SignInEmailPassword;
