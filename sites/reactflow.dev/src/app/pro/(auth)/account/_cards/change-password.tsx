'use client';

import { FormEvent, useState, useTransition } from 'react';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  Button,
  Input,
  InputLabel,
} from '@xyflow/xy-ui';
import { changePassword } from '@/server-actions';
import type { AuthErrorPayload } from '@nhost/nhost-js';

function ChangePasswordCard() {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<AuthErrorPayload | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const newPassword = formData.get('password') as string;
      const { error } = await changePassword(newPassword);
      setError(error);
      setIsSuccess(!error);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        {isSuccess && (
          <CardDescription className="text-green-600">
            Your password has been updated.
          </CardDescription>
        )}
        {error && (
          <CardDescription className="text-red-500">{error.message}</CardDescription>
        )}
      </CardHeader>
      <CardFooter className="bg-muted">
        <form onSubmit={handleSubmit} className="flex space-x-2 justify-between w-full">
          <div className="flex-1">
            <InputLabel htmlFor="password">New Password</InputLabel>
            <Input
              variant="square"
              className="max-w-xs"
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter password..."
            />
          </div>
          <Button disabled={isLoading} className="shrink-0 ml-auto mt-auto" type="submit">
            {isLoading ? 'Please wait...' : 'Change Password'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChangePasswordCard;
