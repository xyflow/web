import * as React from 'react';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription, Button } from 'xy-ui';
import { ErrorPayload } from '@nhost/nextjs';

type AuthErrorProps = {
  error?: ErrorPayload<string>;
};

type AuthNotificationProps = {
  variant?: 'error' | 'success' | 'default';
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export function AuthNotification({ variant = 'default', title, description }: AuthNotificationProps) {
  return (
    <Alert className="mb-4" variant={variant}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}

export function MagicLinkSuccessNotification() {
  return (
    <AuthNotification
      variant="success"
      title="We have sent you a link"
      description="Please check your email to sign in."
    />
  );
}

export function AuthErrorNotification({ error }: AuthErrorProps) {
  const errorId = error?.error;

  if (errorId === 'invalid-email-password') {
    return (
      <AuthNotification
        title="Incorrect email or password"
        description={
          <>
            Please try again or{' '}
            <Button className="text-current font-bold !m-0 !p-0 h-auto" variant="link">
              <Link href="/signin/magic-link">sign in without password</Link>
            </Button>
            .
          </>
        }
        variant="error"
      />
    );
  }

  if (errorId === 'email-already-in-use') {
    return (
      <AuthNotification
        title="Email already in use"
        description={
          <>
            Please use a different email or{' '}
            <Button className="text-current font-bold !m-0 !p-0 h-auto" variant="link">
              <Link href="/signin">sign in</Link>
            </Button>
            .
          </>
        }
        variant="error"
      />
    );
  }

  if (errorId) {
    return <AuthNotification title="Something went wrong" description={error.message} variant="error" />;
  }

  return null;
}
