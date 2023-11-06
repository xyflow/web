'use client';

import { useState, useCallback } from 'react';
import { Button, Alert, AlertTitle, AlertDescription } from '../../..';

type ContactFormProps = {
  children?: React.ReactNode;
};

function ContactForm({ children }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    const formData = new FormData(e.currentTarget);
    // @ts-ignore
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CONTACT_FORM_URL as string,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {isError && (
        <Alert variant="error">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            Please try again or send us a mail to{' '}
            <a href="mailto:info@xyflow.com">info@xyflow.com</a>
          </AlertDescription>
        </Alert>
      )}
      {isSuccess && (
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
          loading={isLoading}
          disabled={isLoading || isSuccess}
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
