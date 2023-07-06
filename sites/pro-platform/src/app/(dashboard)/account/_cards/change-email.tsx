'use client';

import { useUserEmail, useChangeEmail } from '@nhost/nextjs';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, Button } from 'xy-ui';

function ChangeEmailCard() {
  const email = useUserEmail();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
        <CardDescription>Use this form to update your email. We will send you a confirmation mail.</CardDescription>
      </CardHeader>
      <CardFooter className="bg-muted">
        <input className="rounded-lg px-4 py-2 border border-gray-300" type="email" value={email} />
        <Button className="ml-auto" variant="react">
          Update Email
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChangeEmailCard;
