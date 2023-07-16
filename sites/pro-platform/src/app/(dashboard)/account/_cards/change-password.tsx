'use client';

import { useState } from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, Button, Input } from 'xy-ui';

function ChangeEmailCard() {
  const [password] = useState<string>('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Use this form to set a new password.</CardDescription>
      </CardHeader>
      <CardFooter className="bg-muted">
        <div className="flex-1">
          <Input className="max-w-xs" type="email" value={password} />
        </div>
        <Button className="ml-auto" variant="react">
          Update Password
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChangeEmailCard;
