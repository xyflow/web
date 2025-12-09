'use client';

import { FC, FormEvent, useState, useTransition } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Input,
  InputLabel,
} from 'xy-shared';

import { changeEmail } from '@/server-actions';

const ChangeEmailCard: FC<{ userEmail: string }> = ({ userEmail }) => {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [newEmail, setNewEmail] = useState(userEmail);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Prevent resubmitting the form when an error is set
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(event.currentTarget);
      const newEmail = formData.get('email') as string;
      const response = await changeEmail(newEmail);

      setError(response?.error);
      setNeedsEmailVerification(!response?.error);
      setNewEmail(newEmail);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
        {needsEmailVerification && (
          <CardDescription>
            Please confirm your new email by clicking the link we sent to{' '}
            <span className="font-bold">{newEmail}</span>.
          </CardDescription>
        )}
        {error && <CardDescription className="text-red-500">{error}</CardDescription>}
      </CardHeader>
      <CardFooter className="bg-muted space-x-10">
        <form onSubmit={handleSubmit} className="flex justify-between w-full">
          <div className="flex-1">
            <InputLabel htmlFor="email">New Email</InputLabel>
            <Input
              variant="square"
              className="max-w-xs"
              type="email"
              required
              name="email"
              id="email"
              placeholder={userEmail}
              disabled={isLoading || needsEmailVerification}
            />
          </div>
          <Button
            disabled={isLoading || needsEmailVerification}
            className="shrink-0 ml-auto mt-auto"
            type="submit"
          >
            Update Email
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChangeEmailCard;
