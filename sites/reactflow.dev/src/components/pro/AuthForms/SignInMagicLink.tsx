'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import { Button, Input, InputLabel } from '@xyflow/xy-ui';

import { signInEmailPasswordless } from '@/server-actions';
import { AuthErrorNotification, MagicLinkSuccessNotification } from './AuthNotification';

const SignInMagicLink: FC = () => {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] =
    useState<Awaited<ReturnType<typeof signInEmailPasswordless>>>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const error = await signInEmailPasswordless(email);
      setError(error);
      setIsSuccess(!error);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 mb-2">
        {error && <AuthErrorNotification error={error} />}
        {isSuccess && <MagicLinkSuccessNotification />}
        <div>
          <InputLabel className="text-gray-800" htmlFor="email">
            Email
          </InputLabel>
          <Input
            required
            variant="square"
            name="email"
            id="email"
            placeholder="Email"
            disabled={isSuccess}
            type="email"
          />
        </div>

        <Button
          disabled={isLoading || isSuccess}
          loading={isLoading}
          size="lg"
          className="w-full shrink-0"
          type="submit"
        >
          Send secure link
        </Button>
      </div>
    </form>
  );
};

export default SignInMagicLink;
