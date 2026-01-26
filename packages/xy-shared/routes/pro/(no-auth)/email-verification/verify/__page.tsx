import { redirect } from 'next/navigation';
import { createNhostClient } from '../../../../../lib/nhost';
import { SearchParams } from '../../../../../types';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function EmailVerificationVerifyPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const nhost = await createNhostClient();
  const { ticket, redirectTo, type } = searchParams;

  if (ticket && redirectTo && type) {
    redirect(
      `${nhost.auth.baseURL}/verify?ticket=${ticket}&type=${type}&redirectTo=${redirectTo}`,
    );
  }

  redirect('/?error=invalid-ticket');
};
