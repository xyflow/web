'use client';

import { useUserEmail, useChangeEmail } from '@nhost/nextjs';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, Button, Input } from 'xy-ui';

function ChangeEmailCard() {
  const email = useUserEmail();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
        <CardDescription>Use this form to update your email. We will send you a confirmation mail.</CardDescription>
      </CardHeader>
      <CardFooter className="bg-muted space-x-10">
        <Input type="email" value={email} />
        <Button className="shrink-0 ml-auto" variant="react">
          Update Email
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChangeEmailCard;
