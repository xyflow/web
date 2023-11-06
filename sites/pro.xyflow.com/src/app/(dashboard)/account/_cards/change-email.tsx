'use client';

import { useState } from 'react';
import { useUserEmail, useChangeEmail } from '@nhost/nextjs';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, Button, Input, InputLabel } from '@xyflow/xy-ui';

function ChangeEmailCard() {
  const email = useUserEmail();
  const { changeEmail, isLoading } = useChangeEmail();
  const [newEmail, setNewEmail] = useState<string>('');

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    await changeEmail(newEmail);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
        <CardDescription>Use this form to update your email. We will send you a confirmation mail.</CardDescription>
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
            />
          </div>
          <Button disabled={isLoading} className="shrink-0 ml-auto mt-auto" variant="react" type="submit">
            Update Email
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChangeEmailCard;
