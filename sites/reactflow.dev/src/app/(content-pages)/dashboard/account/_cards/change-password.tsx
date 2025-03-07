'use client';

import { useState } from 'react';
import { useChangePassword } from '@nhost/react';
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

function ChangePasswordCard() {
  const [isLoading, setIsLoading] = useState(false);
  const { changePassword, isSuccess, isError, error } = useChangePassword();
  const [newPassword, setNewPassword] = useState<string>('');

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setIsLoading(true);
    await changePassword(newPassword);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        {isSuccess && (
          <CardDescription className="text-green-600">
            Your password has been updated.
          </CardDescription>
        )}
        {isError && (
          <CardDescription className="text-red-500">
            {error ? error.message : 'Something went wrong.'}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className="bg-muted">
        <form
          onSubmit={handleSubmit}
          className="flex space-x-2 justify-between w-full"
        >
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
          <Button
            disabled={isLoading}
            className="shrink-0 ml-auto mt-auto"
            variant="react"
            type="submit"
          >
            {isLoading ? 'Please wait...' : 'Change Password'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

export default ChangePasswordCard;
