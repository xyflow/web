'use client';

import { redirect } from 'next/navigation';
import { nhostOnClient } from '../../../../../lib/nhost-on-client';
import { SearchParams } from '../../../../../types';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EmailVerificationVerifyPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const { ticket, redirectTo, type } = searchParams;

  if (ticket && redirectTo && type) {
    redirect(`${nhostOnClient.auth.baseURL}/verify?ticket=${ticket}&type=${type}&redirectTo=${redirectTo}`);
  }

  redirect('/?error=invalid-ticket');
}
