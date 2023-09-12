'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignInEmailPassword } from '@nhost/nextjs';

import { Button, Input, InputLabel } from 'xy-ui';
import { AuthErrorNotification } from './AuthNotification';

function SignInEmailPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const { signInEmailPassword, isLoading, isSuccess, isError, error } = useSignInEmailPassword();

  useEffect(() => {
    if (isSuccess) {
      router.push(searchParams?.get('redirectTo') || '/');
    }
  }, [isSuccess, router, searchParams]);

  const handleFormSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    signInEmailPassword(form.email, form.password);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {isError && <AuthErrorNotification error={error} />}
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
        <Button loading={isLoading} disabled={isLoading} size="lg" className="w-full" type="submit" variant="react">
          Sign in
        </Button>
      </div>
    </form>
  );
}

export default SignInEmailPassword;
