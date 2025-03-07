'use client';

import { useState } from 'react';
import { useUserEmail, useChangeEmail } from '@nhost/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Input,
  InputLabel,
} from '@xyflow/xy-ui';

function ChangeEmailCard() {
  const email = useUserEmail();
  const { changeEmail, isLoading, needsEmailVerification, isError, error } =
    useChangeEmail();
  const [newEmail, setNewEmail] = useState<string>('');

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    await changeEmail(newEmail);
  };

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
        {isError && (
          <CardDescription className="text-red-500">
            {error ? error.message : 'Something went wrong.'}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="bg-muted space-x-10">
        <form onSubmit={handleSubmit} className="flex justify-between w-full">
          <div className="flex-1">
            <InputLabel htmlFor="email">New Email</InputLabel>
            <Input
              variant="square"
              className="max-w-xs"
              type="email"
              value={newEmail}
              onChange={(evt) => setNewEmail(evt.target.value)}
              required
              id="email"
              placeholder={email}
              disabled={isLoading || needsEmailVerification}
            />
          </div>
          <Button
            disabled={isLoading || needsEmailVerification}
            className="shrink-0 ml-auto mt-auto"
            variant="react"
            type="submit"
          >
            Update Email
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChangeEmailCard;
