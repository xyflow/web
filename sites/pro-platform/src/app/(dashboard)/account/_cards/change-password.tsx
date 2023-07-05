'use client';

import { useState } from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, Button } from 'xy-ui';

function ChangeEmailCard() {
  const [password] = useState<string>('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Use this form to set a new password.</CardDescription>
      </CardHeader>
      <CardFooter className="bg-muted">
        <input className="rounded-lg px-4 py-2 border border-gray-300" type="password" value={password} />
        <Button className="ml-auto" variant="react">
          Update Password
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChangeEmailCard;
