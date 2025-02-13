'use client';

import { useCallback, useState, useEffect, FC, Suspense } from 'react';
import {
  Card,
  InputLabel,
  Input,
  Button,
  Checkbox,
  Accordion,
  Link,
} from '@xyflow/xy-ui';
import { BaseLayout, Hero, SubscribeSection } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export const Form: FC = () => {
  const searchParams = useSearchParams();

  const [formState, setFormState] = useState({
    loading: false,
    error: false,
    success: false,
  });

  const [isDifferentEndUser, setIsDifferentEndUser] = useState(false);

  const [formData, setFormData] = useState({
    plan: 'starter',
    email: '',
    name: '',
    website: '',
    message: '',
  });

  useEffect(() => {
    const plan = searchParams.get('plan');

    if (['starter', 'pro', 'enterprise'].includes(plan)) {
      setFormData((fd) => ({ ...fd, plan }));
    }
  }, [searchParams]);

  const onSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      setFormState({ error: false, loading: true, success: false });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_NHOST_API_URL}/stripe/create-quote`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );

        if (response.ok) {
          return setFormState({ error: false, loading: false, success: true });
        }
      } catch (err) {
        return setFormState({ error: true, loading: false, success: false });
      }

      setFormState({ error: false, loading: false, success: false });
    },
    [formData],
  );

  return (
    <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
      <InputLabel>Subscription Plan</InputLabel>
      <div className="grid grid-cols-3 gap-x-3 px-3 py-2 bg-gray-100 rounded-full">
        <Button
          type="button"
          className={
            formData.plan === 'starter'
              ? 'hover:bg-white cursor-default !bg-white !text-primary'
              : 'hover:bg-gray-100'
          }
          variant={formData.plan === 'starter' ? 'outline' : 'ghost'}
          onClick={() => setFormData((fd) => ({ ...fd, plan: 'starter' }))}
        >
          Starter
        </Button>
        <Button
          type="button"
          className={
            formData.plan === 'pro'
              ? 'hover:bg-white cursor-default !bg-white !text-primary'
              : 'hover:bg-gray-100'
          }
          variant={formData.plan === 'pro' ? 'outline' : 'ghost'}
          onClick={() => setFormData((fd) => ({ ...fd, plan: 'pro' }))}
        >
          Professional
        </Button>
        <Button
          type="button"
          className={
            formData.plan === 'enterprise'
              ? 'hover:bg-white cursor-default !bg-white !text-primary'
              : 'hover:bg-gray-100'
          }
          variant={formData.plan === 'enterprise' ? 'outline' : 'ghost'}
          onClick={() => setFormData((fd) => ({ ...fd, plan: 'enterprise' }))}
        >
          Enterprise
        </Button>
      </div>
      <InputLabel>Contact Email</InputLabel>
      <Input
        name="email"
        type="email"
        required
        placeholder="info@xyflow.com"
        value={formData.email}
        onChange={(evt) =>
          setFormData((fd) => ({ ...fd, email: evt.target.value }))
        }
      />
      <InputLabel>Company Name</InputLabel>
      <Input
        name="name"
        type="text"
        required
        placeholder="ACME Inc."
        value={formData.name}
        onChange={(evt) =>
          setFormData((fd) => ({ ...fd, name: evt.target.value }))
        }
      />
      <InputLabel className="flex gap-2 items-center font-normal">
        <Checkbox
          checked={isDifferentEndUser}
          onCheckedChange={(checked) => setIsDifferentEndUser(!!checked)}
        />
        <span>I am purchasing for another company (reseller)</span>
      </InputLabel>
      {isDifferentEndUser && (
        <>
          <InputLabel>End User Website</InputLabel>
          <Input
            placeholder="https://..."
            name="company"
            type="url"
            required
            value={formData.website}
            onChange={(evt) =>
              setFormData((fd) => ({ ...fd, website: evt.target.value }))
            }
          />
        </>
      )}
      <InputLabel>Send us a message</InputLabel>
      <textarea
        name="message"
        placeholder="Your message..."
        // These classes are copied from the `<Input />` component.
        className="px-4 py-2 border border-gray-300 rounded-lg w-full resize-none"
        rows={5}
        value={formData.message}
        onChange={(evt) =>
          setFormData((fd) => ({ ...fd, message: evt.target.value }))
        }
      />
      <InputLabel className="flex gap-2 items-center font-normal my-6">
        <Checkbox required />
        <div>
          <div>
            I have read and agree to the{' '}
            <Link
              className="text-sm text-primary"
              href="https://xyflow.com/terms-of-use"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </InputLabel>
      {formState.error && (
        <InputLabel className="text-red-500">
          Something went wrong. Please reach out to us at{' '}
          <Link className="text-sm" href="mailto:info@xyflow.com">
            info@xyflow.com
          </Link>
          .
        </InputLabel>
      )}
      {formState.success && (
        <InputLabel className="text-green-700">
          Thanks for your request! We will reach out to you shortly with your
          quote.
        </InputLabel>
      )}
      {!formState.error && !formState.success && (
        <Button
          className="!bg-primary hover:!bg-primary/90"
          type="submit"
          role="submit"
          loading={formState.loading}
          disabled={formState.loading || formState.error || formState.success}
        >
          Request a quote
        </Button>
      )}
    </form>
  );
};

export default function QuoteRequestPage() {
  return (
    <BaseLayout>
      <Hero
        kicker="React Flow Pro"
        title="Request a Quote"
        subtitle="Use the form below to get an official quote for one of our annual subscription plans."
        kickerIcon={<SparklesIcon />}
        align="center"
        backgroundVariant="image"
      />
      <Card className="p-8 bg-white relative max-w-xl mx-auto mt-16">
        <Accordion
          defaultValue={[
            'subscription-plan',
            'contact-details',
            'end-user-details',
          ]}
          type="multiple"
        >
          {/* Fixes useSearchParams() should be wrapped in a suspense boundary at page "/pro/quote-request" */}
          <Suspense fallback="Loading...">
            <Form />
          </Suspense>
        </Accordion>
      </Card>
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
}
