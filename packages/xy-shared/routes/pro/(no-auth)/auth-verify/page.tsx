'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { nhostOnClient } from '../../../../lib/nhost-on-client';

export default function EmailVerificationVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticket = searchParams.get('ticket');

  useEffect(() => {
    if (ticket) {
      const redirectTo = ticket.includes('passwordReset')
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/pro/account`
        : `${process.env.NEXT_PUBLIC_SITE_URL}/pro/dashboard`;

      router.push(`${nhostOnClient.auth.baseURL}/verify?ticket=${ticket}&redirectTo=${encodeURIComponent(redirectTo)}`);
    } else {
      router.push('/pro/dashboard?error=invalid-ticket');
    }
  }, [ticket, router]);

  return null;
}
