'use client';

import { redirect } from 'next/navigation';
import { nhostOnClient } from '../../../../lib/nhost-on-client';
import { SearchParams } from '../../../../types';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EmailVerificationVerifyPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const { ticket } = searchParams;

  if (ticket) {
    const redirectTo = ticket.includes('passwordReset')
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/pro/account`
      : `${process.env.NEXT_PUBLIC_SITE_URL}/pro/dashboard`;
    redirect(`${nhostOnClient.auth.baseURL}/verify?ticket=${ticket}&redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  redirect('/?error=invalid-ticket');
}
