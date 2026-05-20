'use client';

import Link from 'next/link';
import { Heading } from '../../../../components/ui/heading';
import { Text } from '../../../../components/ui/text';
import { useSearchParams } from 'next/navigation';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function EmailVerificationPage() {
  const defaultEmail = useSearchParams().get('email');
  const linkQueryParams = defaultEmail ? `?email=${defaultEmail}` : '';

  return (
    <div className="mx-auto mb-8 mt-16 max-w-2xl text-center">
      <h3 className="text-primary mb-6 flex items-center justify-center text-sm font-bold uppercase tracking-wider">
        <EnvelopeIcon className="mr-1 inline-block h-6 w-6" />
        Verification
      </h3>
      <Heading className="mb-4 font-black">We just sent you an email</Heading>

      <Text className="mt-6 text-xl">
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
