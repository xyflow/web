'use client';

import { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';

type ContactFormProps = {
  children?: React.ReactNode;
  action?: (formData: FormData) => Promise<{ success: boolean }>;
};

async function defaultAction(formData: FormData) {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_FORM_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }

  return { success: true };
}

function ContactForm({ children, action = defaultAction }: ContactFormProps) {
  const [formState, setFormState] = useState<null | 'error' | 'success' | 'loading'>(
    null,
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormState('loading');

      const formData = new FormData(e.currentTarget);

      try {
        const result = await action(formData);
        if (result.success) {
          setFormState('success');
        } else {
          setFormState('error');
        }
      } catch {
        setFormState('error');
      }
    },
    [action],
  );

  return (
    <div className="flex flex-col gap-4">
      {formState === 'error' && (
        <Alert variant="error">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            Please try again or send us a mail to{' '}
            <a href="mailto:info@xyflow.com">info@xyflow.com</a>
          </AlertDescription>
        </Alert>
      )}
      {formState === 'success' && (
        <Alert variant="success">
          <AlertTitle>Thanks for reaching out!</AlertTitle>
          <AlertDescription>
            We{"'"}ll get back to you as soon as possible.
          </AlertDescription>
        </Alert>
      )}
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {children}
        <Button
          loading={formState === 'loading'}
          disabled={formState === 'loading' || formState === 'success'}
          // we need to overwrite the default added [type=submit] { background-color: transparent; } rule from tailwind
          className="!bg-primary hover:!bg-primary/90"
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export { ContactForm, type ContactFormProps };
