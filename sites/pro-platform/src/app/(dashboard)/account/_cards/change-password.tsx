'use client';

import { useState } from 'react';
import { useChangePassword } from '@nhost/nextjs';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, Button, Input, InputLabel } from 'xy-ui';

function ChangePasswordCard() {
  const { changePassword } = useChangePassword();
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    await changePassword(newPassword);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Use this form to update or set a new password.</CardDescription>
      </CardHeader>
      <CardFooter className="bg-muted space-x-10">
        <form onSubmit={handleSubmit} className="flex justify-between w-full">
          <div className="flex-1">
            <InputLabel htmlFor="password">New Password</InputLabel>
            <Input
              variant="square"
              className="max-w-xs"
              type="password"
              value={newPassword}
              onChange={(evt) => setNewPassword(evt.target.value)}
              required
              id="password"
              placeholder="Enter password..."
            />
          </div>
          <Button className="shrink-0 ml-auto mt-auto" variant="react" type="submit">
            Update Password
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChangePasswordCard;
