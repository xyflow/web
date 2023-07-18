'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignInEmailPassword, useSendVerificationEmail } from '@nhost/nextjs';

import { Button, Input, InputLabel } from 'xy-ui';

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
      <div className="flex flex-col">
        <div className="mb-2">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(evt) => setForm({ ...form, email: evt.target.value })}
            autoComplete="on"
            placeholder="Your Email"
            required
            variant="square"
          />
        </div>
        <div className="mb-4">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={form.password}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: evt.target.value })}
            placeholder="Your Password"
            required
            variant="square"
          />
        </div>
        <Button size="lg" className="w-full" type="submit" variant="react">
          Sign in
        </Button>
      </div>
    </form>
  );
}

export default SignInEmailPassword;
