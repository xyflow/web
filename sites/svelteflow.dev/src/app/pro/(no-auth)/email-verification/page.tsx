'use client';

import Link from 'next/link';
import { Heading } from 'xy-shared/components/ui/heading';
import { Text } from 'xy-shared/components/ui/text';
import { useSearchParams } from 'next/navigation';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

function VerifyEmailPage() {
  const defaultEmail = useSearchParams().get('email');
  const linkQueryParams = defaultEmail ? `?email=${defaultEmail}` : '';

  return (
    <div className="mx-auto mt-16 mb-8 max-w-2xl text-center">
      <h3 className="text-sm font-bold mb-6 flex items-center uppercase tracking-wider text-primary justify-center">
        <EnvelopeIcon className="inline-block w-6 h-6 mr-1" />
        Verification
      </h3>
      <Heading className="mb-4 font-black">We just sent you an email</Heading>

      <Text className="text-xl mt-6">
        If you didn{"'"}t receive an email, you can request a new one{' '}
        <Link
          className="text-primary hover:underline"
          href={`/pro/email-verification/resend-link${linkQueryParams}`}
        >
          here
        </Link>
        .
      </Text>
    </div>
  );
}

export default VerifyEmailPage;
