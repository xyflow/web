'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription, Button, cn } from '@xyflow/xy-ui';
import { ErrorPayload } from '@nhost/nhost-js';

type AuthErrorProps = {
  error?: ErrorPayload<string>;
};

type AuthNotificationProps = {
  variant?: 'error' | 'success' | 'default';
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function AuthNotification({
  variant = 'default',
  title,
  description,
  children,
  className,
}: AuthNotificationProps) {
  return (
    <Alert className={cn('mb-4', className)} variant={variant}>
      <div>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </div>
      {children}
    </Alert>
  );
}

export function ExpiredTokenNotification() {
  const searchParams = useSearchParams();
  const isExpiredTokenError = searchParams.get('error') === 'invalid-ticket';

  if (!isExpiredTokenError) {
    return null;
  }

  return (
    <div className="px-4">
      <AuthNotification
        title="Your verification link has expired."
        description="Please request a new verification link to confirm your email and sign in."
        variant="error"
        className="flex justify-between items-center"
      >
        <Link className="shrink-0" href="/email-verification/resend-link">
          <Button variant="destructive">Request a new link</Button>
        </Link>
      </AuthNotification>
    </div>
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
        title="We don't recognize that email or password"
        description={
          <>
            Please try again,{' '}
            <Link className="underline" href="/reset-password">
              reset your password
            </Link>
            , or get a{' '}
            <Link className="underline" href="/signin/magic-link">
              magic link
            </Link>
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
            <Button
              className="text-current font-bold !m-0 !p-0 h-auto"
              variant="link"
            >
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
    return (
      <AuthNotification
        title="Something went wrong"
        description={error.message}
        variant="error"
      />
    );
  }

  return null;
}
